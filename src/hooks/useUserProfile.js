import { useState, useCallback } from 'react';

const useUserProfile = (supabase, toast, initialUser, setUser, setUserRole, setIsAuthenticated) => {
    const [profile, setProfile] = useState(initialUser);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [profileError, setProfileError] = useState(null);

    const loadUserProfile = useCallback(async (authUser, forceFetch = false) => {
        if (!supabase) {
            console.error("Supabase client not available in useUserProfile hook.");
            setIsAuthenticated(false);
            setUser(null);
            setProfile(null);
            setUserRole(null);
            setLoadingProfile(false);
            setProfileError("Supabase client not available");
            return null;
        }
        
        if (!authUser || !authUser.id) {
            console.error("Invalid auth user object in loadUserProfile:", authUser);
            setIsAuthenticated(false);
            setUser(null);
            setProfile(null);
            setUserRole(null);
            setLoadingProfile(false);
            setProfileError("Invalid auth user");
            return null;
        }

        // Se já temos o perfil e não é forçado, apenas retorne o perfil atual
        if (!forceFetch && profile && profile.id === authUser.id && profile.full_name) { 
           console.log("Using cached profile for user:", authUser.email);
           setIsAuthenticated(true);
           setLoadingProfile(false);
           setProfileError(null);
           return profile;
        }
        
        setLoadingProfile(true);
        setProfileError(null);
        
        try {
            console.log("Fetching profile for user:", authUser.email);
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
                setProfileError(error.message);
                // Não faça logout automático, apenas reporte o erro
                setLoadingProfile(false);
                return null;
            }

            if (fetchedProfile) {
                const fullUser = { 
                    id: authUser.id, 
                    email: authUser.email, 
                    ...authUser.user_metadata,
                    ...fetchedProfile,
                    role: fetchedProfile.role, 
                };
                
                console.log("Profile loaded successfully:", fullUser.email, "Role:", fullUser.role);
                
                setUser(fullUser); 
                setProfile(fullUser);
                setUserRole(fetchedProfile.role);
                setIsAuthenticated(true);
                setProfileError(null);
                
                return fullUser;
            } else {
                console.warn('Profile not found for user in hook:', authUser.id, '. User might need to complete registration or there is an issue with handle_new_user trigger.');
                toast({ title: "Perfil Incompleto", description: "Dados do perfil não encontrados. Por favor, tente relogar ou contate o suporte.", variant: "warning" });
                
                // Criar um perfil básico com os dados disponíveis
                const basicProfile = {
                    id: authUser.id,
                    email: authUser.email,
                    role: authUser.user_metadata?.role || 'user',
                    full_name: authUser.user_metadata?.full_name || authUser.email
                };
                
                setUser(basicProfile);
                setProfile(basicProfile);
                setUserRole(basicProfile.role);
                setIsAuthenticated(true);
                setProfileError("Profile not found but using basic data");
                
                return basicProfile;
            }
        } catch (e) {
            console.error("Unexpected error in loadUserProfile:", e);
            toast({ title: "Erro Inesperado", description: "Ocorreu um erro ao carregar o perfil.", variant: "destructive" });
            setIsAuthenticated(false);
            setUser(null);
            setProfile(null);
            setUserRole(null);
            setProfileError(e.message);
            return null;
        } finally {
            setLoadingProfile(false);
        }
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

        
        if (error) {
            setLoadingProfile(false);
            toast({ title: "Erro ao Atualizar Perfil", description: error.message, variant: "destructive" });
            return null;
        }
        
        if(data) {
            const authUser = (await supabase.auth.getUser())?.data?.user;
            if (authUser) await loadUserProfile(authUser, true); 
            toast({ title: "Perfil Atualizado", description: "Suas informações foram salvas." });
        }
        setLoadingProfile(false); 
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

        
        if (uploadError) {
            setLoadingProfile(false);
            toast({ title: "Erro de Upload", description: uploadError.message, variant: "destructive" });
            return null;
        }

        const { data: { publicUrl } } = supabase.storage.from('profile_pictures').getPublicUrl(filePath);
        
        if (!publicUrl) {
            setLoadingProfile(false);
            toast({ title: "Erro ao obter URL", description: "Não foi possível obter a URL pública da imagem.", variant: "destructive" });
            return null;
        }
        setLoadingProfile(false);
        return publicUrl;
    };

    return { profile, loadingProfile, profileError, loadUserProfile, updateUserProfile, uploadProfileImage };
};

export default useUserProfile;
