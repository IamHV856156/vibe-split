import { useEffect,useState } from "react";
import { getEntries } from "./entryService";
import { supabase } from "@/services/supabaseClient";
export const useEntries = (groupId) => {
    const [entries,setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEntries = async () =>{
        if (!groupId) {
            return;
        }
        setLoading(true);
        const {data, error} = await getEntries(groupId);
        if(!error){
            setEntries(data);
        }
        setLoading(false);
    };
    useEffect(()=>{
        fetchEntries();

        if (!groupId) {
            return;
        }
        const channel = supabase.channel(`entries-${groupId}`).on("postgres_changes",{
            event:"*",
            schema:"public",
            table:"entries",
            filter: `group_id=eq.${groupId}`,
        },(payLoad)=>{
            fetchEntries();
        }
    ).subscribe();

    return ()=> {
        supabase.removeChannel(channel)
    };
    },[groupId]);
    return{entries,loading,fetchEntries};
};