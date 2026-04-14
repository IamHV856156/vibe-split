import { useState,useEffect } from "react";
import { getGroups } from "./groupServices";
export const useGroups = (userid) =>{
    const [groups,setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGroups = async () =>{
        if(!userid){
            setLoading(false);
            return;
        };

        setLoading(true);

        const {data,error} = await getGroups(userid);
        console.log("GROUP RAW:", data, error);
        if(!error && data){
            setGroups(data);
        }
        setLoading(false);
    };

    useEffect(()=>{
        fetchGroups();
    },[userid]);

    return{groups,loading,fetchGroups};
}