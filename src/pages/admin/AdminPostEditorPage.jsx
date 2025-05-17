
    import React, { useState, useEffect, useCallback, useRef } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { useBlog } from '@/contexts/BlogContext.jsx';
    import { useAuth } from '@/contexts/AuthContext.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { useToast } from '@/components/ui/use-toast.jsx';
    import { Save, ArrowLeft, UploadCloud } from 'lucide-react';
    import { motion } from 'framer-motion';
    import AdminPostFormFields from '@/components/admin/editor/AdminPostFormFields.jsx';
    import AdminPostQuillEditor from '@/components/admin/editor/AdminPostQuillEditor.jsx';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog.jsx';
    import { Input } from '@/components/ui/input.jsx';
    import { Label } from '@/components/ui/label.jsx';

    const AdminPostEditorPage = () => {
      const { postId } = useParams();
      const navigate = useNavigate();
      const { getPostById, addPost, updatePost, uploadBlogImage } = useBlog();
      const { user, userRole } = useAuth();
      const { toast } = useToast();
      const quillRef = useRef(null);

      const isEditing = Boolean(postId);
      const [formData, setFormData] = useState({
        title: '', slug: '', category: '', tags: '',
        excerpt: '', content: '', imageUrl: '', imageAlt: '', featured: false, 
        approved: userRole === 'manager', 
      });
      const [isLoading, setIsLoading] = useState(false);
      const [isUploading, setIsUploading] = useState(false);
      const [lastSavedData, setLastSavedData] = useState(null);
      const [imageFile, setImageFile] = useState(null);
      const [imagePreview, setImagePreview] = useState(null);
      const [isImageUploadDialogOpen, setIsImageUploadDialogOpen] = useState(false);


      const AUTOSAVE_INTERVAL = 30000; // 30 seconds

      const generateSlug = (title) => {
        return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-').trim();
      };

      useEffect(() => {
        const loadPost = async () => {
          setIsLoading(true);
          const draftKey = isEditing ? `post_draft_${postId}` : 'new_post_draft';
          const savedDraft = localStorage.getItem(draftKey);

          if (isEditing && postId) {
            const postToEdit = await getPostById(postId);
            if (postToEdit) {
              if (userRole === 'creator' && postToEdit.user_id !== user.id) {
                toast({ title: "Acesso Negado", description: "Você não tem permissão para editar este post.", variant: "destructive" });
                navigate('/painel/posts');
                setIsLoading(false);
                return;
              }
              const initialData = {
                ...postToEdit,
                tags: postToEdit.tags ? postToEdit.tags.join(', ') : '',
                imageUrl: postToEdit.image_url || '',
              };
              setFormData(savedDraft ? JSON.parse(savedDraft) : initialData);
              setLastSavedData(initialData);
              if(postToEdit.image_url) setImagePreview(postToEdit.image_url);
            } else {
              toast({ title: "Erro", description: "Post não encontrado.", variant: "destructive" });
              navigate('/painel/posts');
            }
          } else {
            const initialNewData = {
              title: '', slug: '', category: '', tags: '',
              excerpt: '', content: '', imageUrl: '', imageAlt: '', featured: false, 
              approved: userRole === 'manager',
            };
            setFormData(savedDraft ? JSON.parse(savedDraft) : initialNewData);
            setLastSavedData(initialNewData);
            setImagePreview(null);
          }
          setIsLoading(false);
        };
        loadPost();
      }, [postId, isEditing, getPostById, navigate, user, userRole, toast]);


      const handleAutosave = useCallback(() => {
        if (JSON.stringify(formData) !== JSON.stringify(lastSavedData) && !isLoading) {
          const draftKey = isEditing ? `post_draft_${postId}` : 'new_post_draft';
          localStorage.setItem(draftKey, JSON.stringify(formData));
          setLastSavedData(formData); 
          toast({ title: "Rascunho Salvo", description: "Seu progresso foi salvo automaticamente.", variant: "default" });
        }
      }, [formData, isEditing, postId, lastSavedData, toast, isLoading]);
      

      useEffect(() => {
        const timer = setInterval(handleAutosave, AUTOSAVE_INTERVAL);
        return () => clearInterval(timer);
      }, [handleAutosave]);


      const handleFormChange = useCallback((field, value) => {
        setFormData(prev => {
          if (field === 'title') {
            return { ...prev, title: value, slug: generateSlug(value) };
          }
          return { ...prev, [field]: value };
        });
      }, []);
      
      const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
      };

      const handleImageUpload = async () => {
        if (!imageFile) {
            toast({ title: "Nenhum arquivo", description: "Selecione uma imagem para enviar.", variant: "destructive" });
            return;
        }
        setIsUploading(true);
        const uploadedImageUrl = await uploadBlogImage(imageFile);
        setIsUploading(false);

        if (uploadedImageUrl) {
            handleFormChange('imageUrl', uploadedImageUrl);
            toast({ title: "Sucesso", description: "Imagem de capa enviada e URL atualizada." });
            setIsImageUploadDialogOpen(false); 
        } else {
            toast({ title: "Falha no Upload", description: "Não foi possível enviar a imagem de capa.", variant: "destructive" });
        }
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.slug || !formData.category || !formData.excerpt || !formData.content) {
          toast({ title: "Campos Obrigatórios", description: "Por favor, preencha todos os campos obrigatórios.", variant: "destructive"});
          return;
        }

        setIsLoading(true);
        
        let finalImageUrl = formData.imageUrl;
        if (imageFile && !formData.imageUrl.startsWith('http')) { // Prioritize newly uploaded image if URL isn't already set
            const uploadedUrl = await uploadBlogImage(imageFile);
            if (uploadedUrl) {
                finalImageUrl = uploadedUrl;
            } else {
                toast({ title: "Falha no Upload da Capa", description: "Não foi possível enviar a imagem de capa. O post será salvo sem ela.", variant: "warning" });
            }
        }

        const postData = {
          ...formData,
          imageUrl: finalImageUrl,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          user_id: user.id,
        };

        try {
          if (isEditing) {
            await updatePost({ ...postData, id: postId });
            toast({ title: "Sucesso!", description: "Post atualizado com sucesso." });
          } else {
            await addPost(postData);
            toast({ title: "Sucesso!", description: "Novo post criado com sucesso." });
          }
          const draftKey = isEditing ? `post_draft_${postId}` : 'new_post_draft';
          localStorage.removeItem(draftKey); 
          navigate('/painel/posts');
        } catch (error) {
          console.error("Submit error: ", error);
          toast({ title: "Erro", description: `Ocorreu um erro ao salvar o post: ${error.message}`, variant: "destructive" });
        } finally {
          setIsLoading(false);
        }
      };
      
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 pb-12"
        >
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => navigate('/painel/posts')} className="border-primary text-primary hover:bg-primary/5">
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para Lista
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              {isEditing ? 'Editar Post' : 'Criar Novo Post'}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AdminPostFormFields 
              formData={formData} 
              onFormChange={handleFormChange} 
              userRole={userRole} 
              imagePreview={imagePreview}
              onImageUploadDialogOpen={() => setIsImageUploadDialogOpen(true)}
            />
            
            <AdminPostQuillEditor 
                ref={quillRef}
                content={formData.content} 
                onContentChange={(value) => handleFormChange('content', value)}
                uploadBlogImage={uploadBlogImage}
            />
            
            <div className="flex justify-end space-x-3 pt-4 sticky bottom-0 bg-background py-4 border-t border-border z-10">
                <Button type="button" variant="outline" onClick={() => navigate('/painel/posts')} disabled={isLoading} className="border-primary text-primary hover:bg-primary/5">
                    Cancelar
                </Button>
                <Button type="submit" disabled={isLoading || isUploading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    {(isLoading || isUploading) ? (
                      <motion.div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-foreground mr-2"></motion.div>
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    {(isLoading || isUploading) ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Publicar Post')}
                </Button>
            </div>
          </form>

            <Dialog open={isImageUploadDialogOpen} onOpenChange={setIsImageUploadDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload da Imagem de Capa</DialogTitle>
                        <DialogDescription>
                            Selecione uma imagem para a capa do seu post. Formatos recomendados: JPG, PNG, WebP. Tamanho máximo: 5MB.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div>
                            <Label htmlFor="imageFile" className="text-primary font-semibold">Escolher arquivo</Label>
                            <Input 
                                id="imageFile" 
                                type="file" 
                                accept="image/jpeg,image/png,image/webp,image/gif" 
                                onChange={handleImageFileChange} 
                                className="mt-1"
                            />
                        </div>
                        {imagePreview && (
                            <div className="mt-4">
                                <Label className="text-primary font-semibold">Pré-visualização:</Label>
                                <img src={imagePreview} alt="Pré-visualização da capa" className="mt-2 rounded-md max-h-60 w-auto object-contain border border-border" />
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsImageUploadDialogOpen(false)} disabled={isUploading}>Cancelar</Button>
                        <Button onClick={handleImageUpload} disabled={!imageFile || isUploading} className="bg-accent text-accent-foreground hover:bg-accent/90">
                            {isUploading ? (
                                <>
                                    <motion.div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-foreground mr-2"></motion.div>
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    <UploadCloud className="h-4 w-4 mr-2" />
                                    Enviar Imagem
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </motion.div>
      );
    };

    export default AdminPostEditorPage;
  