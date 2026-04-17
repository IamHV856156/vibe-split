import { supabase } from "@/services/supabaseClient";

//generate invite code
const generateCode = () => Math.random().toString(36).substring(2,8);

//create groups
export const createGroup = async (name, userid) =>{
    const inviteCode = generateCode();

    const{ data,error} = await supabase.from("groups").insert([
        {
            name,
            created_by: userid,
            invite_code:inviteCode,
        },
    ]).select().maybeSingle();

    if (error) {
        return {error};
    }

    // user who create the group will be add as role of admin in member table
    const {error: memberError} = await supabase.from("members").insert([
        {
            user_id: userid,
            group_id: data.id,
            role: "admin",
        },
    ]);

    if(memberError){
        return{
            error: memberError
        };
    }
    return {data};
};

// get groups
export const getGroups = async (userid)=>{
    const {data:members,error} = await supabase.from("members").select("*").eq("user_id",userid);

    if (error) {
        return{error};
    }
    const ids = members.map((m)=> m.group_id);
    const {data:groups} = await supabase.from("groups").select("*").in("id",ids);
    return{data:groups};
};

// get groups by groupId
export const getGroupById = async (groupId) => {
  return await supabase.from("groups").select("*").eq("id", groupId).single();
};

// join groups
export const joinGroups = async (inviteCode,userid) =>{
    const {data: group} = await supabase.from("groups").select("*").eq("invite_code",inviteCode).single();
    if (!group) {
        return{
            error:{message:"Invalid code"}
        };
    }
    // users who join will be add as role of member in members table
    return await supabase.from("members").insert([{
        user_id: userid,
        group_id:group.id,
        role:"member",
    },
]);
};