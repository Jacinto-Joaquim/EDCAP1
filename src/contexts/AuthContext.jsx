
    import React, { createContext, useState, useEffect, useContext } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { getSupabase } from '@/config/supabaseClient.jsx';
    import { useToast } from '@/components/ui/use-toast.jsx';
    import useUserProfile from '@/hooks/useUserProfile.js';
    import { supabaseSessionManager } from '@/lib/supabaseSessionManager.js';

    const AuthContext = createContext();

    export const useAuth = () => useContext(AuthContext);

    const CREATOR_KEY = "3\"w4r22#dwE&43$52dW3\"";
    const MANAGER_KEY = "FHrw%#$Sdv(7VBFDwry6\"";

    export const AuthProvider = ({ children }) => {
      const [userState, setUserState] = useState(null); // Raw Supabase user object
      const [userRoleState, setUserRoleState] = useState(null);
      const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
      const [loadingAuthState, setLoadingAuthState] = useState(true);
      const navigate = useNavigate();
      const { toast } = useToast();
      
      const supabase = getSupabase();

      const { 
        profile, // This is the combined profile data from 'profiles' table + authUser
        loadingProfile, 
        loadUserProfile, 
        updateUserProfile, 
        uploadProfileImage,
      } = useUserProfile(supabase, toast, null, setUserState, setUserRoleState, setIsAuthenticatedState); // Pass null as initialUser for profile

      useEffect(() => {
        if (!supabase) {
          console.error("CRITICAL: Supabase client not available in AuthContext. Check supabaseClient.jsx and environment variables.");
          toast({ title: "Erro Crítico", description: "Cliente Supabase indisponível. Funcionalidades de autenticação e dados podem não funcionar.", variant: "destructive" });
          setLoadingAuthState(false);
          setIsAuthenticatedState(false);
          return;
        }

        const { manageSession, onAuthStateChange } = supabaseSessionManager(
            supabase, 
            loadUserProfile, 
            setLoadingAuthState, 
            setIsAuthenticatedState, 
            setUserState, 
            setUserRoleState, 
            navigate
        );
        
        manageSession(); 
        const { data: authListener } = onAuthStateChange();
        
        return () => {
          authListener?.subscription?.unsubscribe();
        };
      }, [navigate, loadUserProfile, supabase, toast]);
      
      const login = async (email, password) => {
        if (!supabase) {
          toast({ title: "Erro de Configuração", description: "Serviço de autenticação indisponível.", variant: "destructive" });
          return false;
        }
        
        setLoadingAuthState(true);
        
        try {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          
          if (error) {
            toast({ title: "Erro de Login", description: error.message, variant: "destructive" });
            return false;
          }
          
          if (data.user) {
            toast({ title: "Login Bem-sucedido!", description: "Bem-vindo de volta!" });
            // Remover a navegação daqui, deixando apenas na página de login
            navigate('/painel/dashboard'); 
            return true;
          }
          
          return false;
        } catch (error) {
          console.error("Erro inesperado durante login:", error);
          toast({ title: "Erro de Login", description: "Ocorreu um erro inesperado. Tente novamente.", variant: "destructive" });
          return false;
        } finally {
          setLoadingAuthState(false);
        }
      };

      const register = async (email, password, role, secretKey, fullName) => {
        if (!supabase) {
          toast({ title: "Erro de Configuração", description: "Serviço de autenticação indisponível.", variant: "destructive" });
          return;
        }
        setLoadingAuthState(true);
        if ((role === 'creator' && secretKey !== CREATOR_KEY) || (role === 'manager' && secretKey !== MANAGER_KEY)) {
          toast({ title: "Erro de Registro", description: "Chave secreta inválida para a função selecionada.", variant: "destructive" });
          setLoadingAuthState(false);
          return;
        }

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { 
              role: role,
              full_name: fullName,
            }
          }
        });
        
        setLoadingAuthState(false);

        if (signUpError) {
          toast({ title: "Erro de Registro", description: signUpError.message, variant: "destructive" });
          return;
        }
        
        if (signUpData.user) {
          toast({ title: "Registro Quase Completo!", description: "Verifique seu email para confirmar a conta. Após a confirmação, o perfil será totalmente criado."});
          navigate('/painel-edcap-admin-s3cr3t0l0g1n');
        }
      };

      const logout = async () => {
        if (!supabase) {
          toast({ title: "Erro de Configuração", description: "Serviço de autenticação indisponível.", variant: "destructive" });
          return;
        }
        setLoadingAuthState(true);
        const { error } = await supabase.auth.signOut();
        if (error) {
          toast({ title: "Erro ao Sair", description: error.message, variant: "destructive" });
           setLoadingAuthState(false); 
        } else {
          toast({ title: "Desconectado", description: "Você saiu da sua conta." });
        }
      };
      
      const fetchUsers = async () => {
        if (!supabase || userRoleState !== 'manager') {
            toast({ title: "Acesso Negado", description: "Apenas gerentes podem buscar usuários.", variant: "destructive" });
            return [];
        }
        setLoadingAuthState(true);
        const { data: { users: fetchedUsersList }, error } = await supabase.auth.admin.listUsers();
        setLoadingAuthState(false);

        if (error) {
            toast({ title: "Erro ao Buscar Usuários", description: error.message, variant: "destructive" });
            return [];
        }
        
        const profilesPromises = fetchedUsersList.map(u => 
            supabase.from('profiles').select('id, full_name, role, email').eq('id', u.id).single()
        );
        const profilesResults = await Promise.allSettled(profilesPromises);
        
        const combinedUsers = fetchedUsersList.map(u => {
            const profileResult = profilesResults.find(p => p.status === 'fulfilled' && p.value.data?.id === u.id);
            return {
                ...u,
                full_name: profileResult?.value?.data?.full_name || u.email,
                role: profileResult?.value?.data?.role || u.user_metadata?.role || 'Desconhecido',
            };
        });
        return combinedUsers;
    };


      return (
        <AuthContext.Provider value={{ 
            user: profile, 
            userRole: userRoleState, 
            isAuthenticated: isAuthenticatedState, 
            loading: loadingAuthState || loadingProfile, 
            login, 
            register, 
            logout, 
            updateUserProfile, 
            uploadProfileImage,
            fetchUsers
        }}>
          {children}
        </AuthContext.Provider>
      );
    };
  