import { useCallback, useEffect, useRef, useState } from "react";
import { getEntries, deleteEntry as deleteEntryservice, updateEntry as updateEntryservice } from "./entryService";

export const useEntries = (groupId) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEntries = useCallback(async () => {
        if (!groupId) return;
        // setLoading(true)
        const { data, error } = await getEntries(groupId);
        if (!error) {
            setEntries(data || []);
        }
        setLoading(false);
    }, [groupId]);
    useEffect(()=>{
        fetchEntries();
    },[fetchEntries]);
    const deleteEntries = async (id) => {
        const { data,error } = await deleteEntryservice(id);
        console.log("delete:",data,error);
        if (!error) fetchEntries();
    };

    const updateEntries = async (id, updates) => {
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
    return { entries, loading, fetchEntries, deleteEntries, updateEntries };
};