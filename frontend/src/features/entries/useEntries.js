import { useEffect,useState } from "react";
import { getEntries } from "./entryService";
import { supabase } from "@/services/supabaseClient";
import { deleteEntry as deleteEntryService, updateEntry as updateEntryService } from "./entryService";
export const useEntries = (groupId) => {
    const [entries,setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    const deleteEntry = async (id) => {
        const { error } = await deleteEntryService(id);
        if (!error) {
            fetchEntries(); // 🔥 auto refresh
            }
        };
    const updateEntry = async (id, updates) => {
        const { error } = await updateEntryService(id, updates);
        if (!error) {
            fetchEntries(); // 🔥 auto refresh
            }
        };
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
        if (!groupId) {
            return;
        }
        fetchEntries();
        //realtime connections
        const channel = supabase.channel(`entries-${groupId}`).on("postgres_changes",{
            event:"*",
            schema:"public",
            table:"entries",
            filter: `group_id=eq.${groupId}`,
        },(payLoad)=>{
            console.log("realtime:",payLoad);
            fetchEntries();
        }
    ).subscribe();

    return ()=> {
        supabase.removeChannel(channel)
    };
    },[groupId]);
    return { entries, loading, fetchEntries, deleteEntry, updateEntry};
};