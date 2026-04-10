import { supabase } from "@/services/supabaseClient";


//generate invite code
const generateCode = () => Math.random().toString(36).substring(2,8);

//create groups
export const createGroup = async (name, userid) =>{
    const inviteCode = generateCode();
    return await supabase.from("groups").insert([
        {
            name,
            created_by:userid,
            invite_code:inviteCode,
        },
    ]);
};

export const getGroups = async (userid)=>{
    return await supabase.from("members").select(`group_id,groups(*)`).eq("user_id",userid);
};