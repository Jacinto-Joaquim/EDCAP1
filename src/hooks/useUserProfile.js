
    import { useState, useCallback } from 'react';

    const useUserProfile = (supabase, toast, initialUser, setUser, setUserRole, setIsAuthenticated) => {
        const [profile, setProfile] = useState(initialUser);
        const [loadingProfile, setLoadingProfile] = useState(false);

        const loadUserProfile = useCallback(async (authUser, forceFetch = false) => {
            if (!supabase) {
                console.error("Supabase client not available in useUserProfile hook.");
                setIsAuthenticated(false);
                setUser(null);
                setProfile(null);
                setUserRole(null);
                return;
            }
            
            if (!authUser) {
                setIsAuthenticated(false);
                setUser(null);
                setProfile(null);
                setUserRole(null);
                return;
            }

            if (!forceFetch && profile && profile.id === authUser.id && profile.full_name) { 
               setIsAuthenticated(true);
               return;
            }
            
            setLoadingProfile(true);
            const { data: fetchedProfile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();

            if (error) {
                console.error('Error fetching user profile in hook:', error);
                toast({ title: "Erro de Perfil", description: "Não foi possível carregar os dados do perfil.", variant: "destructive" });
                setIsAuthenticated(false);
                setUser(null);
                setProfile(null);
                setUserRole(null);
                await supabase.auth.signOut().catch(e => console.error("Error signing out after profile fetch error:", e));
                setLoadingProfile(false);
                return;
            }

            if (fetchedProfile) {
                const fullUser = { 
                    id: authUser.id, 
                    email: authUser.email, 
                    ...authUser.user_metadata,
                    ...fetchedProfile,
                    role: fetchedProfile.role, 
                };
                setUser(fullUser);
                setProfile(fullUser);
                setUserRole(fetchedProfile.role);
                setIsAuthenticated(true);
            } else {
                console.warn('Profile not found for user in hook:', authUser.id, '. User might need to complete registration or there is an issue with handle_new_user trigger.');
                toast({ title: "Perfil Incompleto", description: "Dados do perfil não encontrados. Por favor, tente relogar ou contate o suporte.", variant: "warning" });
                setIsAuthenticated(false);
                setUser(null);
                setProfile(null);
                setUserRole(null);
            }
            setLoadingProfile(false);
        }, [supabase, toast, profile, setUser, setUserRole, setIsAuthenticated]);


        const updateUserProfile = async (profileData) => {
            if (!profile) {
                toast({ title: "Erro", description: "Nenhum usuário logado.", variant: "destructive" });
                return null;
            }
            if (!supabase) {
                 toast({ title: "Erro de Configuração", description: "Serviço de perfil indisponível.", variant: "destructive" });
                 return null;
            }
            setLoadingProfile(true);
            const { data, error } = await supabase
                .from('profiles')
                .update({
                    full_name: profileData.full_name,
                    description: profileData.description,
                    education: profileData.education,
                    experience: profileData.experience,
                    profile_image_url: profileData.profile_image_url,
                    updated_at: new Date().toISOString()
                })
                .eq('id', profile.id)
                .select()
                .single();

            setLoadingProfile(false);
            if (error) {
                toast({ title: "Erro ao Atualizar Perfil", description: error.message, variant: "destructive" });
                return null;
            }
            
            if(data) {
                const authUser = (await supabase.auth.getUser())?.data?.user;
                if (authUser) await loadUserProfile(authUser, true); 
                toast({ title: "Perfil Atualizado", description: "Suas informações foram salvas." });
            }
            return data;
        };

        const uploadProfileImage = async (file) => {
            if (!profile) {
                toast({ title: "Erro", description: "Nenhum usuário logado.", variant: "destructive" });
                return null;
            }
            if (!file) {
                toast({ title: "Erro", description: "Nenhum arquivo selecionado.", variant: "destructive" });
                return null;
            }
             if (!supabase) {
                 toast({ title: "Erro de Configuração", description: "Serviço de upload indisponível.", variant: "destructive" });
                 return null;
            }

            setLoadingProfile(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
            const filePath = `public/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('profile_pictures')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true, 
                });

            setLoadingProfile(false);
            if (uploadError) {
                toast({ title: "Erro de Upload", description: uploadError.message, variant: "destructive" });
                return null;
            }

            const { data: { publicUrl } } = supabase.storage.from('profile_pictures').getPublicUrl(filePath);
            
            if (!publicUrl) {
                toast({ title: "Erro ao obter URL", description: "Não foi possível obter a URL pública da imagem.", variant: "destructive" });
                return null;
            }
            
            return publicUrl;
        };

        return { profile, loadingProfile, loadUserProfile, updateUserProfile, uploadProfileImage };
    };

    export default useUserProfile;
  