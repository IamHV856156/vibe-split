import { useState,useEffect } from "react";
import { getGroups } from "./groupServices";
import { getgroups } from "node:process";
export const useGroups = (userid) =>{
    const [groups,setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGroups = async () =>{
        if(!userid) return;

        setLoading(true);

        const {data,error} = await getgroups(userid);
        if(!error && data){
            const cleanGroups = data.map((item)=>item.groups).filter((g)=>g !== null);
            setGroups(cleanGroups);
        }

        setLoading(false);
    };

    useEffect(()=>{
        fetchGroups();
    },[userid]);

    return{groups,loading,fetchGroups};
}