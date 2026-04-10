import { supabase } from "@/services/supabaseClient";
export const addEntry = async (entry) =>{
    return await supabase.from("entries").insert([entry]);
};
export const getEntries = async (groupId) =>{
    return await supabase.from("entries").select(`*, profiles (name)`).eq("group_id",groupId).order("created_at",{ascending: false})
}