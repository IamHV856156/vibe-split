import { useEffect,useState } from "react";
import { getEntries } from "./entryService";
import { supabase } from "@/services/supabaseClient";
export const useEntries = (groupId) => {
    const[entries,setEntries] = useState([]);
    useEffect(()=>{
        if (!groupId) {
            return;
        }
        const fetchEntries = async () =>{
            const {data} = await getEntries(groupId);
            setEntries(data || []);
        };
        fetchEntries();
    },[groupId]);
    return{entries};
};