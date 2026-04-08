import { supabase } from "@/services/supabaseClient";

export const createGroup = async (name, userid) =>{
    return await supabase.from("groups").insert([
        {
            name,
            created_by:userid,
        },
    ]);
};

export const getGroups = async (userid)=>{
    return await supabase.from("groups").select("*").eq("created_by",userid);
};