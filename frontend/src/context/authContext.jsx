import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleUser = async (user) => {
      if (!user) {
        return console.log("user:",user);
      }
        const {data :profile,error } = await supabase.from("profiles").select("*").eq("id",user.id).maybeSingle();
        console.log("Profile:",profile,error);

      if (!profile) {
        const {error: insertError} = await supabase.from("profiles").insert([
          {
            id: user.id,
            name: user.user_metadata?.name || "user",
          },
        ]);

        console.log("profile insert:",insertError);
      }
    }
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
      await handleUser(user);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
        setLoading(false);
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