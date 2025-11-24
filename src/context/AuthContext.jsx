import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          setRole(session.user.user_metadata?.role || "usuario");
        }
      } catch (err) {
        console.error("Error cargando sesión:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setRole(session.user.user_metadata?.role || "usuario");
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user);
      setRole(data.user.user_metadata?.role || "usuario");
      return data.user;
    } catch (err) {
      console.error("Error login:", err);
      throw err;
    }
  };

const register = async (email, password, role = "importador") => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role } },
      });
      
      if (error) throw error;

      // FIX: Si Supabase nos loguea automáticamente (Auto Confirm ON),
      // actualizamos el estado aquí mismo para evitar race conditions.
      if (data.session) {
          setUser(data.user);
          setRole(data.user.user_metadata?.role || role);
      }

      // Retornamos user Y session para verificar en la vista
      return { user: data.user, session: data.session };
    } catch (err) {
      console.error("Error register:", err);
      throw err;
    }
  };
  
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setRole(null);
    } catch (err) {
      console.error("Error logout:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
