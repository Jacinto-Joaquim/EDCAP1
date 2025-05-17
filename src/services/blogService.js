
    const formatPost = (post) => ({
      ...post,
      author: post.profiles?.full_name || post.profiles?.email || 'Autor Desconhecido',
      authorId: post.user_id,
      authorName: post.profiles?.full_name || 'Autor Desconhecido',
      authorRole: post.profiles?.role,
      authorProfileImageUrl: post.profiles?.profile_image_url,
      date: post.published_at || post.created_at,
      profiles: post.profiles
    });

    const fetchPosts = async (supabase, toast, setPostsState, setLoading) => {
      if (!supabase) {
          console.error("Supabase client not available in BlogService for fetchPosts.");
          setPostsState([]);
          if(setLoading) setLoading(false);
          return;
      }
      if(setLoading) setLoading(true);
      let query = supabase.from('posts').select(`
        *,
        profiles (
          id,
          full_name,
          role,
          profile_image_url,
          social_linkedin,
          social_twitter,
          social_facebook,
          social_instagram
        )
      `).order('published_at', { ascending: false });
      
      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
        toast({ title: "Erro ao Carregar Posts", description: error.message, variant: "destructive" });
        setPostsState([]);
      } else {
        const formattedPosts = data.map(formatPost);
        setPostsState(formattedPosts);
      }
      if(setLoading) setLoading(false);
    };

    const addPost = async (supabase, toast, user, userRole, setLoading, setPostsState, postData) => {
      if (!supabase || !user) {
          toast({ title: "Erro", description: "Não autenticado ou Supabase não disponível.", variant: "destructive" });
          return null;
      }
      if(setLoading) setLoading(true);
      
      const newPostData = {
        user_id: user.id,
        profile_id: user.id, 
        title: postData.title,
        slug: postData.slug,
        category: postData.category,
        tags: postData.tags,
        excerpt: postData.excerpt,
        content: postData.content,
        image_url: postData.imageUrl,
        image_alt: postData.imageAlt,
        featured: postData.featured,
        approved: userRole === 'manager' ? postData.approved : false,
        published_at: userRole === 'manager' && postData.approved ? new Date().toISOString() : null,
      };

      const { data, error } = await supabase
        .from('posts')
        .insert(newPostData)
        .select(`
          *,
          profiles (id, full_name, role, profile_image_url, social_linkedin, social_twitter, social_facebook, social_instagram)
        `)
        .single();

      if (error) {
        console.error('Error adding post:', error);
        toast({ title: "Erro ao Adicionar Post", description: error.message, variant: "destructive" });
        if(setLoading) setLoading(false);
        return null;
      }

      if (data) {
        const formattedData = formatPost(data);
        setPostsState(prevPosts => [formattedData, ...prevPosts].sort((a,b) => new Date(b.date) - new Date(a.date)));
        toast({ title: "Sucesso!", description: "Novo post adicionado." });
      }
      if(setLoading) setLoading(false);
      return data;
    };

    const updatePost = async (supabase, toast, user, userRole, setLoading, setPostsState, currentPosts, updatedPostData) => {
      if (!supabase || !user) {
          toast({ title: "Erro", description: "Não autenticado ou Supabase não disponível.", variant: "destructive" });
          return null;
      }
      if(setLoading) setLoading(true);
      
      const existingPost = currentPosts.find(p => p.id === updatedPostData.id);
      const postToUpdate = {
        title: updatedPostData.title,
        slug: updatedPostData.slug,
        category: updatedPostData.category,
        tags: updatedPostData.tags,
        excerpt: updatedPostData.excerpt,
        content: updatedPostData.content,
        image_url: updatedPostData.imageUrl,
        image_alt: updatedPostData.imageAlt,
        featured: updatedPostData.featured,
        approved: userRole === 'manager' ? updatedPostData.approved : (existingPost?.approved || false), 
        published_at: (userRole === 'manager' && updatedPostData.approved && !existingPost?.published_at) ? new Date().toISOString() : (existingPost?.published_at), 
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('posts')
        .update(postToUpdate)
        .eq('id', updatedPostData.id)
        .select(`
          *,
          profiles (id, full_name, role, profile_image_url, social_linkedin, social_twitter, social_facebook, social_instagram)
        `)
        .single();

      if (error) {
        console.error('Error updating post:', error);
        toast({ title: "Erro ao Atualizar Post", description: error.message, variant: "destructive" });
        if(setLoading) setLoading(false);
        return null;
      }
      
      if (data) {
        const formattedData = formatPost(data);
        setPostsState(prevPosts => 
          prevPosts.map(post => (post.id === formattedData.id ? formattedData : post))
          .sort((a,b) => new Date(b.date) - new Date(a.date))
        );
        toast({ title: "Sucesso!", description: "Post atualizado." });
      }
      if(setLoading) setLoading(false);
      return data;
    };

    const deletePost = async (supabase, toast, setLoading, setPostsState, postId) => {
      if (!supabase) {
          toast({ title: "Erro", description: "Supabase não disponível.", variant: "destructive" });
          return;
      }
      if(setLoading) setLoading(true);
      const { error } = await supabase.from('posts').delete().eq('id', postId);

      if (error) {
        console.error('Error deleting post:', error);
        toast({ title: "Erro ao Deletar Post", description: error.message, variant: "destructive" });
      } else {
        setPostsState(prevPosts => prevPosts.filter(post => post.id !== postId));
        toast({ title: "Sucesso!", description: "Post deletado.", variant: "destructive" });
      }
      if(setLoading) setLoading(false);
    };

    const getPostBySlug = async (supabase, toast, setLoading, slug) => {
      if (!supabase) {
          toast({ title: "Erro", description: "Supabase não disponível.", variant: "destructive" });
          return null;
      }
      if(setLoading) setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (id, full_name, role, profile_image_url, description, education, experience, social_linkedin, social_twitter, social_facebook, social_instagram)
        `)
        .eq('slug', slug)
        .eq('approved', true) 
        .maybeSingle(); 
        
      if(setLoading) setLoading(false);
      if (error) {
        console.error('Error fetching post by slug:', error);
        return null;
      }
      if (data) {
         return formatPost(data);
      }
      return null;
    };
    
    const getPostById = async (supabase, toast, setLoading, id) => {
      if (!supabase) {
          toast({ title: "Erro", description: "Supabase não disponível.", variant: "destructive" });
          return null;
      }
      if(setLoading) setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (id, full_name, role, profile_image_url, social_linkedin, social_twitter, social_facebook, social_instagram)
        `)
        .eq('id', id)
        .single();
        
      if(setLoading) setLoading(false);
      if (error) {
        console.error('Error fetching post by id:', error);
        return null;
      }
      if (data) {
         return formatPost(data);
      }
      return null;
    };
    
    const uploadBlogImage = async (supabase, toast, user, setLoading, file) => {
      if (!supabase || !user) {
          toast({ title: "Erro", description: "Não autenticado ou Supabase não disponível.", variant: "destructive" });
          return null;
      }
      if (!file) {
          toast({ title: "Erro", description: "Nenhum arquivo selecionado.", variant: "destructive" });
          return null;
      }

      if(setLoading) setLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `post-${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
          .from('post_images')
          .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false, 
          });

      if (uploadError) {
          toast({ title: "Erro de Upload de Imagem do Post", description: uploadError.message, variant: "destructive" });
          if(setLoading) setLoading(false);
          return null;
      }

      const { data } = supabase.storage.from('post_images').getPublicUrl(filePath);
      
      if (!data?.publicUrl) {
          toast({ title: "Erro ao obter URL da Imagem", description: "Não foi possível obter a URL pública da imagem do post.", variant: "destructive" });
          if(setLoading) setLoading(false);
          return null;
      }
      
      if(setLoading) setLoading(false);
      toast({ title: "Upload Concluído", description: "Imagem do post enviada com sucesso." });
      return data.publicUrl;
    };

    export const blogServiceFunctions = {
      fetchPosts,
      addPost,
      updatePost,
      deletePost,
      getPostBySlug,
      getPostById,
      uploadBlogImage
    };
  