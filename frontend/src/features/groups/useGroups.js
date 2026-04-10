import { useState,useEffect } from "react";
import { getGroups } from "./groupServices";
export const useGroups = (userid) =>{
    const [groups,setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGroups = async () =>{
        if(!userid) return;

        setLoading(true);

        const {data,error} = await getGroups(userid);
        console.log("GROUP RAW:", data, error);
        if(!error && data){
            const cleanGroups = data.map((item)=>item.groups).filter(Boolean);
            setGroups(cleanGroups);
        }

        setLoading(false);
    };

    useEffect(()=>{
        fetchGroups();
    },[userid]);

    return{groups,loading,fetchGroups};
}