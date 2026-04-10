import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const handleUser = async (user) => {
    if (!user) return;

    console.log("USER:", user.id);

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    console.log("PROFILE:", profile, error);

    if (!profile) {
      console.log("CREATING PROFILE...");

      const { error: insertError } = await supabase
        .from("profiles")
        .insert([
          {
            id: user.id,
            name: user.user_metadata?.name || "user",
          },
        ]);

      console.log("PROFILE INSERT:", insertError);
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