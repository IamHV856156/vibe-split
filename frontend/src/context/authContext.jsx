import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const handleUser = async (user) => {
    if (!user) return;

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile) {
       await supabase.from("profiles").insert([
          {
            id: user.id,
            name: user.user_metadata?.name || "user",
          },
        ]);

    }
  };

  const init = async () => {
    const { data } = await supabase.auth.getUser();

    const currentUser = data.user;
    setUser(currentUser);
    setLoading(false);

    handleUser(currentUser);
  };

  init();

  const { data: listener } = supabase.auth.onAuthStateChange(
    (_, session) => {
      const currentUser = session?.user || null;

      setUser(currentUser);
      setLoading(false);

      handleUser(currentUser);
    }
  );

  return () => listener.subscription.unsubscribe();
}, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);