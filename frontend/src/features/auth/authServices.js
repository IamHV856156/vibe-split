// import { supabase } from "@/services/supabaseClient";
// export const signUp = (email,password)=>{
//     return supabase.auth.signUp({email,password});
// };

// export const signIn = (email,password) =>{
//     return supabase.auth.signInWithPassword([email,password]);
// };

// export const signOut = supabase.auth.signOut();

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