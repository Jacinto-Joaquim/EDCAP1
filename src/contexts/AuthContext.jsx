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
  const [authInitialized, setAuthInitialized] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const supabase = getSupabase();

  const { 
    profile, // This is the combined profile data from 'profiles' table + authUser
    loadingProfile, 
    profileError,
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
      setAuthInitialized(true);
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
    
    const initAuth = async () => {
      await manageSession();
      setAuthInitialized(true);
    };
    
    initAuth();
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
      console.log("Iniciando login para:", email);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Erro de login:", error.message);
        toast({ title: "Erro de Login", description: error.message, variant: "destructive" });
        return false;
      }
      
      if (data?.user) {
        console.log("Login bem-sucedido para:", email);
        
        // Garantir que o usuário seja carregado corretamente
        const userProfile = await loadUserProfile(data.user);
        
        if (!userProfile) {
          console.error("Falha ao carregar perfil após login");
          toast({ title: "Erro de Perfil", description: "Não foi possível carregar seu perfil. Tente novamente.", variant: "destructive" });
          return false;
        }
        
        // Definir explicitamente o estado de autenticação
        setIsAuthenticatedState(true);
        setUserState(data.user);
        
        toast({ title: "Login Bem-sucedido!", description: "Bem-vindo de volta!" });
        return true;
      }
      
      console.error("Login falhou: dados do usuário não retornados");
      toast({ title: "Erro de Login", description: "Falha ao obter dados do usuário. Tente novamente.", variant: "destructive" });
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
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({ title: "Erro ao Sair", description: error.message, variant: "destructive" });
      } else {
        // Limpar estados explicitamente
        setIsAuthenticatedState(false);
        setUserState(null);
        setUserRoleState(null);
        toast({ title: "Desconectado", description: "Você saiu da sua conta." });
        // Navegar para a página de login após logout bem-sucedido
        navigate('/painel-edcap-admin-s3cr3t0l0g1n', { replace: true });
      }
    } catch (error) {
      console.error("Erro inesperado durante logout:", error);
      toast({ title: "Erro ao Sair", description: "Ocorreu um erro inesperado. Tente novamente.", variant: "destructive" });
    } finally {
      setLoadingAuthState(false);
    }
  };
  
  const fetchUsers = async () => {
    if (!supabase || userRoleState !== 'manager') {
         toast({ title: "Acesso Negado", description: "Apenas gerentes podem buscar usuários.", variant: "destructive" });
        return [];
    }
    setLoadingAuthState(true);
    try {
      const { data: { users: fetchedUsersList }, error } = await supabase.auth.admin.listUsers();
      
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
    } catch (error) {
      console.error("Erro inesperado ao buscar usuários:", error);
      toast({ title: "Erro ao Buscar Usuários", description: "Ocorreu um erro inesperado. Tente novamente.", variant: "destructive" });
      return [];
    } finally {
      setLoadingAuthState(false);
    }
  };


  return (
    <AuthContext.Provider value={{ 
        user: profile, 
        userRole: userRoleState, 
        isAuthenticated: isAuthenticatedState, 
        loading: loadingAuthState || loadingProfile,
        authInitialized,
        profileError,
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
