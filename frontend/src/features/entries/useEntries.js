import { useCallback, useEffect, useRef, useState } from "react";
import { getEntries, deleteEntry as deleteEntryservice, updateEntry as updateEntryservice } from "./entryService";
// import { supabase } from "@/services/supabaseClient";

export const useEntries = (groupId) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEntries = useCallback(async () => {
        if (!groupId) return;
        // setLoading(true);
        const { data, error } = await getEntries(groupId);
        if (!error) {
            setEntries(data || []);
        }
        setLoading(false);
    }, [groupId]);

    const deleteEntry = async (id) => {
        const { error } = await deleteEntryservice(id);
        if (!error) fetchEntries();
    };

    const updateEntry = async (id, updates) => {
        const { error } = await updateEntryservice(id, updates);
        if (!error) fetchEntries();
    };

    // instead of realtime complex channel making i tried to use simple polling method
    useEffect(() => {
        if (!groupId) return;

        fetchEntries();

        const interval = setInterval(()=>{
            fetchEntries();
        },5000);

        return()=> clearInterval(interval);
    },[groupId,fetchEntries]);

    //     // 1. Define a unique channel name
    //     const channelName = `realtime-entries-${groupId}`;

    //     // 2. Create the channel instance
    //     const channel = supabase.channel(channelName);

    //     // 3. Attach listener BEFORE subscribing
    //     channel.on(
    //             "postgres_changes",
    //             {
    //                 event: "*",
    //                 schema: "public",
    //                 table: "entries",
    //                 filter: `group_id=eq.${groupId}`,
    //             },
    //             () => {
    //                 // console.log("Realtime update triggered");
    //                 fetchEntries();
    //             }
    //         )
    //         .subscribe((status) => {
    //             if (status === 'SUBSCRIBED') {
    //                 console.log('Subscribed to Realtime!');
    //             }
    //         });

    //     channelRef.current = channel;

    //     // 4. Cleanup function: This is the ONLY place you should remove the channel
    //     return () => {
    //         if (channelRef.current) {
    //             supabase.removeChannel(channelRef.current);
    //             channelRef.current = null;
    //         }
    //     };
        
    //     // IMPORTANT: Removed fetchEntries from dependencies to prevent infinite loops
    // }, [groupId]); 

    return { entries, loading, fetchEntries, deleteEntry, updateEntry };
};