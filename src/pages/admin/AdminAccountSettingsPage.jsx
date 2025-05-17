
    import React, { useState, useEffect, useRef } from 'react';
    import { useAuth } from '@/contexts/AuthContext.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { Input } from '@/components/ui/input.jsx';
    import { Label } from '@/components/ui/label.jsx';
    import { Textarea } from '@/components/ui/textarea.jsx';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
    import { useToast } from "@/components/ui/use-toast.jsx";
    import { motion } from 'framer-motion';
    import { User, Briefcase, BookOpen, Linkedin, Twitter, Facebook, Instagram, UploadCloud, Save } from 'lucide-react';

    const AdminAccountSettingsPage = () => {
      const { user, updateUserProfile, uploadProfileImage, loading: authLoading } = useAuth();
      const { toast } = useToast();
      const [formData, setFormData] = useState({
        full_name: '',
        description: '',
        education: '',
        experience: '',
        profile_image_url: '',
        social_linkedin: '',
        social_twitter: '',
        social_facebook: '',
        social_instagram: '',
      });
      const [profileImageFile, setProfileImageFile] = useState(null);
      const [imagePreview, setImagePreview] = useState('');
      const [isSubmitting, setIsSubmitting] = useState(false);
      const fileInputRef = useRef(null);

      useEffect(() => {
        if (user) {
          setFormData({
            full_name: user.full_name || '',
            description: user.description || '',
            education: user.education || '',
            experience: user.experience || '',
            profile_image_url: user.profile_image_url || '',
            social_linkedin: user.social_linkedin || '',
            social_twitter: user.social_twitter || '',
            social_facebook: user.social_facebook || '',
            social_instagram: user.social_instagram || '',
          });
          setImagePreview(user.profile_image_url || '');
        }
      }, [user]);

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setProfileImageFile(file);
          setImagePreview(URL.createObjectURL(file));
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        let imageUrl = formData.profile_image_url;

        if (profileImageFile) {
          const uploadedImageUrl = await uploadProfileImage(profileImageFile);
          if (uploadedImageUrl) {
            imageUrl = uploadedImageUrl;
          } else {
            toast({ title: "Erro no Upload", description: "Não foi possível carregar a nova imagem de perfil.", variant: "destructive" });
            setIsSubmitting(false);
            return;
          }
        }
        
        const updatedProfileData = { ...formData, profile_image_url: imageUrl };
        const success = await updateUserProfile(updatedProfileData);

        if (success) {
          toast({ title: "Perfil Atualizado", description: "Suas informações foram salvas com sucesso." });
        }
        setIsSubmitting(false);
      };

      if (authLoading && !user) {
        return <div className="flex justify-center items-center h-full"><p>Carregando perfil...</p></div>;
      }
      
      if (!user) {
        return <div className="flex justify-center items-center h-full"><p>Usuário não encontrado. Por favor, faça login novamente.</p></div>;
      }

      const socialFields = [
        { name: 'social_linkedin', label: 'LinkedIn URL', icon: <Linkedin className="h-5 w-5 text-primary" /> },
        { name: 'social_twitter', label: 'Twitter URL', icon: <Twitter className="h-5 w-5 text-primary" /> },
        { name: 'social_facebook', label: 'Facebook URL', icon: <Facebook className="h-5 w-5 text-primary" /> },
        { name: 'social_instagram', label: 'Instagram URL', icon: <Instagram className="h-5 w-5 text-primary" /> },
      ];

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto p-4 md:p-6"
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-primary flex items-center">
                <User className="mr-3 h-8 w-8" /> Configurações da Conta
              </CardTitle>
              <CardDescription>Atualize suas informações de perfil e foto.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32 border-4 border-primary shadow-md">
                    <AvatarImage src={imagePreview || user?.profile_image_url} alt={user?.full_name || 'User'} />
                    <AvatarFallback className="text-4xl bg-muted text-primary">
                      {user?.full_name ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="text-primary border-primary hover:bg-primary/10">
                    <UploadCloud className="mr-2 h-4 w-4" /> Alterar Foto
                  </Button>
                  <Input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    className="hidden" 
                    accept="image/*" 
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="full_name" className="text-primary font-semibold flex items-center"><User className="mr-2 h-4 w-4" />Nome Completo</Label>
                    <Input id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} className="mt-1 bg-input" />
                  </div>
                   <div>
                    <Label htmlFor="email" className="text-primary font-semibold">Email (não editável)</Label>
                    <Input id="email" name="email" value={user.email || ''} readOnly disabled className="mt-1 bg-muted/50 cursor-not-allowed" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-primary font-semibold flex items-center"><Briefcase className="mr-2 h-4 w-4" />Descrição / Sobre Mim</Label>
                  <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} className="mt-1 bg-input" placeholder="Fale um pouco sobre você, sua especialidade..." />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="education" className="text-primary font-semibold flex items-center"><BookOpen className="mr-2 h-4 w-4" />Formação Acadêmica</Label>
                    <Input id="education" name="education" value={formData.education} onChange={handleChange} className="mt-1 bg-input" placeholder="Ex: Mestre em Gestão, Licenciado em Economia" />
                  </div>
                  <div>
                    <Label htmlFor="experience" className="text-primary font-semibold flex items-center"><Briefcase className="mr-2 h-4 w-4" />Experiência Profissional</Label>
                    <Input id="experience" name="experience" value={formData.experience} onChange={handleChange} className="mt-1 bg-input" placeholder="Ex: Consultor Sênior, 10 anos em Finanças" />
                  </div>
                </div>

                <Card className="pt-4 bg-muted/30">
                  <CardHeader className="pb-2 pt-0">
                     <CardTitle className="text-xl font-semibold text-primary">Redes Sociais</CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                    {socialFields.map(field => (
                      <div key={field.name}>
                        <Label htmlFor={field.name} className="text-primary font-medium flex items-center">
                          {field.icon} <span className="ml-2">{field.label}</span>
                        </Label>
                        <Input 
                          id={field.name} 
                          name={field.name} 
                          type="url"
                          value={formData[field.name]} 
                          onChange={handleChange} 
                          className="mt-1 bg-input" 
                          placeholder={`https://www.${field.name.split('_')[1]}.com/...`}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>


                <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-base" disabled={isSubmitting || authLoading}>
                  {isSubmitting ? (
                    <motion.div className="animate-spin rounded-full h-5 w-5 border-b-2 border-accent-foreground mr-2"></motion.div>
                  ) : (
                    <Save className="mr-2 h-5 w-5" />
                  )}
                  {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    export default AdminAccountSettingsPage;
  