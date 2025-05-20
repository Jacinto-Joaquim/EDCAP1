
    import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import { useBlog } from '@/contexts/BlogContext.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { useToast } from '@/components/ui/use-toast.jsx';
    import { PlusCircle, List } from 'lucide-react';
    import { useSearchParams, useNavigate } from 'react-router-dom';
    import AdminPostList from '@/components/admin/AdminPostList.jsx';
    import AdminPostForm from '@/components/admin/AdminPostForm.jsx';
    
    const PageHeader = ({ title }) => (
      <div className="bg-gradient-to-r from-primary to-secondary py-12 md:py-16 text-center text-primary-foreground mb-10">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold font-lato"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
      </div>
    );

    const AdminPage = () => {
      const { posts, addPost, updatePost, deletePost, getPostById } = useBlog();
      const { toast } = useToast();
      const [searchParams] = useSearchParams();
      const navigate = useNavigate();

      const [view, setView] = useState('list'); 
      const [currentPost, setCurrentPost] = useState(null); 
      
      const initialFormData = {
        title: '', slug: '', author: 'Equipe EDCAP', category: '', tags: '',
        excerpt: '', content: '', imageUrl: '', featured: false,
      };
      const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
      const processParams = async () => {
        const editId = searchParams.get('edit');
        const newPost = searchParams.get('new');

        if (editId) {
          const postToEdit = await getPostById(editId); // await se necessário
          if (postToEdit) {
            setCurrentPost(postToEdit);
            setFormData({
              ...postToEdit,
              tags: postToEdit.tags ? postToEdit.tags.join(', ') : '',
            });
            setView('form');
          } else {
            toast({ title: "Erro", description: "Post para edição não encontrado.", variant: "destructive" });
            navigate('/admin');
          }
        } else if (newPost) {
          setView('form');
          setCurrentPost(null);
          setFormData(initialFormData);
        } else {
          setView('list');
          setCurrentPost(null);
          setFormData(initialFormData);
        }
      };

      processParams();
    }, [searchParams, getPostById, toast, navigate]);


      const handleFormSubmit = (submittedData) => {
        if (currentPost) {
          updatePost({ ...currentPost, ...submittedData });
          toast({ title: "Sucesso!", description: "Post atualizado com sucesso." });
        } else {
          addPost(submittedData);
          toast({ title: "Sucesso!", description: "Novo post adicionado com sucesso." });
        }
        setView('list');
        navigate('/admin');
      };

      const handleEdit = (post) => {
        navigate(`/admin?edit=${post.id}`);
      };

      const handleDelete = (postId) => {
        const postToDelete = getPostById(postId);
        deletePost(postId);
        toast({ title: "Sucesso!", description: `Post "${postToDelete?.title || 'Selecionado'}" deletado.`, variant: "destructive" });
        if (currentPost && currentPost.id === postId) {
            setView('list');
            navigate('/admin');
        }
      };
      
      const handleCancelForm = () => {
        setView('list');
        navigate('/admin');
      }

      return (
        <div className="min-h-screen bg-gray-100">
          <PageHeader title="Painel de Administração do Blog" />
          
          <div className="container mx-auto px-4 pb-16">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-primary">
                {view === 'list' ? 'Lista de Posts' : currentPost ? 'Editar Post' : 'Novo Post'}
              </h2>
              <div>
                {view === 'form' && (
                  <Button variant="outline" onClick={handleCancelForm} className="mr-2">
                    <List className="h-4 w-4 mr-2" /> Ver Lista
                  </Button>
                )}
                {view === 'list' && (
                  <Button onClick={() => navigate('/admin?new=true')}>
                    <PlusCircle className="h-4 w-4 mr-2" /> Novo Post
                  </Button>
                )}
              </div>
            </div>

            {view === 'list' && (
              <AdminPostList 
                posts={posts} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            )}

            {view === 'form' && (
              <AdminPostForm 
                initialData={currentPost ? formData : initialFormData} 
                onSubmit={handleFormSubmit}
                onCancel={handleCancelForm}
                isEditing={!!currentPost}
              />
            )}
          </div>
        </div>
      );
    };

    export default AdminPage;
  