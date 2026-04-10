import { supabase } from "../../services/supabaseClient";

export const signIn = (email, password,name) => {
  return supabase.auth.signInWithPassword({
    email: email,
    password: password,
    options:{
      data:{
        name:name,
      },
    },
  });
};

export const signUp = (email, password) => {
  return supabase.auth.signUp({
    email: email,
    password: password,
  });
};
export const logOut = async () =>{
  return await supabase.auth.signOut();
};