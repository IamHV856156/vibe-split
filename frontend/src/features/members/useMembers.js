import { useEffect,useState } from "react";
import { getMembers } from "./memberService";

export const useMembers = (groupid) =>{
    const[members,setMembers] = useState([]);
    const fetchMembers = async () =>{
        if (!groupid) {
            return;
        }
        const {data,error} =await getMembers(groupid);
        console.log("MEMBERS RAW:", data);

        if (!error && data) {
            const clean = data.map((m)=>m.profiles).filter(Boolean);

            setMembers(clean);
        }
    };

    useEffect(()=>{
        fetchMembers();
    },[groupid]);

    return {members,fetchMembers};
};