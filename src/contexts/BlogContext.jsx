
    import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
    import { getSupabase } from '@/config/supabaseClient.jsx';
    import { useAuth } from '@/contexts/AuthContext.jsx';
    import { useToast } from "@/components/ui/use-toast.jsx";
    import { blogServiceFunctions } from '@/services/blogService.js';

    const BlogContext = createContext();

    export const useBlog = () => useContext(BlogContext);

    export const BlogProvider = ({ children }) => {
      const [posts, setPosts] = useState([]);
      const [loading, setLoading] = useState(false);
      const { user, userRole } = useAuth(); // Removed isAuthenticated as it's implied by user object
      const { toast } = useToast();
      const supabase = getSupabase();

      const memoizedFetchPosts = useCallback(async () => {
        if (supabase) {
          await blogServiceFunctions.fetchPosts(supabase, toast, setPosts, setLoading);
        } else {
          console.error("Supabase client not available in BlogContext for initial fetch.");
          setLoading(false);
        }
      }, [supabase, toast, setLoading]);

      useEffect(() => {
        memoizedFetchPosts();
      }, [memoizedFetchPosts]);
      
      const memoizedAddPost = useCallback(async (postData) => {
        return blogServiceFunctions.addPost(supabase, toast, user, userRole, setLoading, setPosts, postData);
      }, [supabase, toast, user, userRole, setLoading]);

      const memoizedUpdatePost = useCallback(async (updatedPostData) => {
        return blogServiceFunctions.updatePost(supabase, toast, user, userRole, setLoading, setPosts, posts, updatedPostData);
      }, [supabase, toast, user, userRole, setLoading, posts]);

      const memoizedDeletePost = useCallback(async (postId) => {
        return blogServiceFunctions.deletePost(supabase, toast, setLoading, setPosts, postId);
      }, [supabase, toast, setLoading]);

      const memoizedGetPostBySlug = useCallback(async (slug) => {
        return blogServiceFunctions.getPostBySlug(supabase, toast, setLoading, slug);
      }, [supabase, toast, setLoading]);
      
      const memoizedGetPostById = useCallback(async (id) => {
        return blogServiceFunctions.getPostById(supabase, toast, setLoading, id);
      }, [supabase, toast, setLoading]);

      const getRecentPosts = useCallback((count = 4) => {
        return posts.filter(p => p.approved).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, count);
      }, [posts]);
      
      const memoizedUploadBlogImage = useCallback(async (file) => {
        return blogServiceFunctions.uploadBlogImage(supabase, toast, user, setLoading, file);
      }, [supabase, toast, user, setLoading]);

      return (
        <BlogContext.Provider value={{ 
          posts, 
          loading, 
          addPost: memoizedAddPost, 
          updatePost: memoizedUpdatePost, 
          deletePost: memoizedDeletePost, 
          getPostBySlug: memoizedGetPostBySlug, 
          getPostById: memoizedGetPostById, 
          getRecentPosts, 
          fetchPosts: memoizedFetchPosts,
          uploadBlogImage: memoizedUploadBlogImage
        }}>
          {children}
        </BlogContext.Provider>
      );
    };
  