import { supabase } from "@/services/supabaseClient";
export const signUp = (email,password)=>{
    return supabase.auth.signUp({email,password});
};

export const signIn = (email,password) =>{
    return supabase.auth.signInWithPassword([email,password]);
};