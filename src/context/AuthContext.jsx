import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión al inicio
  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        setRole(session.user.user_metadata?.role || null);
      }

      setLoading(false);
    };

    loadSession();

    // Suscripción a cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          setRole(session.user.user_metadata?.role || null);
        } else {
          setUser(null);
          setRole(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // -----------------------------
  // LOGIN
  // -----------------------------
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    setUser(data.user);
    setRole(data.user.user_metadata?.role);

    return data.user;
  };

  // -----------------------------
  // REGISTER
  // -----------------------------
  const register = async (email, password, role = "importador") => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
      },
    });

    if (error) throw error;

    return data.user;
  };

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
