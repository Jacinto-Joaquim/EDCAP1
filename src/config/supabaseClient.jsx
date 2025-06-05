
    import { createClient } from '@supabase/supabase-js';

    let supabaseInstance = null;

    const supabaseUrl = "https://zldtsjblyhgumsnxunop.supabase.co";
    const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsZHRzamJseWhndW1zbnh1bm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMTY3NTQsImV4cCI6MjA2Mjc5Mjc1NH0.jUJxpPmOwfA4NtGC75q_4PTIMgnk2Iid-s3UjW4h3PY";

    const initializeSupabase = () => {
        if (supabaseInstance) {
            return supabaseInstance;
        }

        if (supabaseUrl && supabaseAnonKey) {
            try {
                supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
                console.log("Supabase client initialized successfully using provided credentials!");
            } catch (error) {
                console.error("Error creating Supabase client with provided credentials:", error.message);
                supabaseInstance = null; 
            }
        } else {
            console.error("Supabase URL or Anon Key is missing. Supabase client not initialized.");
            supabaseInstance = null;
        }
        return supabaseInstance;
    };
    
    export const getSupabase = () => {
        if (!supabaseInstance) {
            console.warn("Supabase client was not initialized. Attempting to initialize now via getSupabase.");
            console.log("O supabase instancia nao foi inicializado")
            return initializeSupabase();
        }
        return supabaseInstance;
    };

    initializeSupabase();

    export default supabaseInstance;
  