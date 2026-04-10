import { supabase } from "@/services/supabaseClient";
export const getMembers = async (groupid) =>{
    return await supabase.from("members").select(`user_id,profiles(id,name)`).eq("group_id",groupid);
};