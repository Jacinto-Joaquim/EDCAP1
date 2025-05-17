
    import React, { createContext, useState, useEffect, useContext } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { getSupabase } from '@/config/supabaseClient.jsx';
    import { useToast } from '@/components/ui/use-toast.jsx';
    import useUserProfile from '@/hooks/useUserProfile.js';
    import { supabaseSessionManager } from '@/lib/supabaseSessionManager.js';
    // A chamada para sendToEmailMarketingAPI foi removida daqui

    const AuthContext = createContext();

    export const useAuth = () => useContext(AuthContext);

    const CREATOR_KEY = "3\"w4r22#dwE&43$52dW3\"";
    const MANAGER_KEY = "FHrw%#$Sdv(7VBFDwry6\"";

    export const AuthProvider = ({ children }) => {
      const [userState, setUserState] = useState(null);
      const [userRoleState, setUserRoleState] = useState(null);
      const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);
      const [loading, setLoading] = useState(true);
      const navigate = useNavigate();
      const { toast } = useToast();
      
      const supabase = getSupabase();

      const { 
        profile, 
        loadingProfile, 
        loadUserProfile, 
        updateUserProfile, 
        uploadProfileImage 
      } = useUserProfile(supabase, toast, userState, setUserState, setUserRoleState, setIsAuthenticatedState);

      useEffect(() => {
        if (!supabase) {
          console.error("CRITICAL: Supabase client not available in AuthContext. Check supabaseClient.jsx and environment variables.");
          toast({ title: "Erro Crítico", description: "Cliente Supabase indisponível. Funcionalidades de autenticação e dados podem não funcionar.", variant: "destructive" });
          setLoading(false);
          setIsAuthenticatedState(false);
          return;
        }

        const { manageSession, onAuthStateChange } = supabaseSessionManager(supabase, loadUserProfile, setLoading, setIsAuthenticatedState, setUserState, setUserRoleState, navigate);
        
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
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) {
          toast({ title: "Erro de Login", description: error.message, variant: "destructive" });
          return false;
        }
        if (data.user) {
          await loadUserProfile(data.user);
          toast({ title: "Login Bem-sucedido!", description: "Bem-vindo de volta!" });
          navigate('/painel/dashboard');
          return true;
        }
        return false;
      };

      const register = async (email, password, role, secretKey, fullName) => {
        if (!supabase) {
          toast({ title: "Erro de Configuração", description: "Serviço de autenticação indisponível.", variant: "destructive" });
          return;
        }
        setLoading(true);
        if ((role === 'creator' && secretKey !== CREATOR_KEY) || (role === 'manager' && secretKey !== MANAGER_KEY)) {
          toast({ title: "Erro de Registro", description: "Chave secreta inválida para a função selecionada.", variant: "destructive" });
          setLoading(false);
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
        
        setLoading(false);

        if (signUpError) {
          toast({ title: "Erro de Registro", description: signUpError.message, variant: "destructive" });
          return;
        }
        
        if (signUpData.user) {
          toast({ title: "Registro Quase Completo!", description: "Verifique seu email para confirmar a conta. Após a confirmação, o perfil será totalmente criado."});
          // A chamada para sendToEmailMarketingAPI foi removida daqui.
          navigate('/painel-edcap-admin-s3cr3t0l0g1n');
        }
      };

      const logout = async () => {
        if (!supabase) {
          toast({ title: "Erro de Configuração", description: "Serviço de autenticação indisponível.", variant: "destructive" });
          return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        setLoading(false);
        if (error) {
          toast({ title: "Erro ao Sair", description: error.message, variant: "destructive" });
        } else {
          setUserState(null);
          setUserRoleState(null);
          setIsAuthenticatedState(false);
          navigate('/painel-edcap-admin-s3cr3t0l0g1n');
          toast({ title: "Desconectado", description: "Você saiu da sua conta." });
        }
      };

      return (
        <AuthContext.Provider value={{ 
            user: profile, 
            userRole: userRoleState, 
            isAuthenticated: isAuthenticatedState, 
            loading: loading || loadingProfile, 
            login, 
            register, 
            logout, 
            updateUserProfile, 
            uploadProfileImage,
            loadUserProfile 
        }}>
          {children}
        </AuthContext.Provider>
      );
    };
  