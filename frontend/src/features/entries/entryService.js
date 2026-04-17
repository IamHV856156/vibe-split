import { supabase } from "@/services/supabaseClient";
export const addEntry = async (entry) =>{
    return await supabase.from("entries").insert([entry]);
};
export const getEntries = async (groupId) =>{
    return await supabase.from("entries").select(`*, profiles (name)`).eq("group_id",groupId).order("created_at",{ascending: false})
};
export const updateEntry = async (id, updates) => {
  return await supabase.from("entries").update([updates]).eq("id", id).select();
};

export const deleteEntry = async (id) => {
  return await supabase.from("entries").delete().eq("id", id).select();
  
};