import { useEffect,useState } from "react";
import { getMembers } from "./memberService";

export const useMembers = (groupid) =>{
    const[members,setMembers] = useState([]);
    const fetchMembers = async () =>{
        if (!groupid) {
            return;
        }
        const {data,error} =await getMembers(groupid);

        if (!error && data) {
            const clean = data.map((m)=>({...m.profiles,role: m.role,user_id:m.user_id})).filter(Boolean);

            setMembers(clean);
        }
    };

    useEffect(()=>{
        fetchMembers();
    },[groupid]);

    return {members,fetchMembers};
};