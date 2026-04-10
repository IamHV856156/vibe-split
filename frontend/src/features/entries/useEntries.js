import { useEffect,useState } from "react";
import { getEntries } from "./entryService";
export const useEntries = (groupId) => {
    const [entries,setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEntries = async () =>{
        if (!groupId) {
            return;
        }
        setLoading(true);
        const {data, error} = await getEntries(groupId);
        console.log("entries data:", data, error);
        if(!error){
            setEntries(data);
        }
        setLoading(false);
    };
    useEffect(()=>{
        fetchEntries();
    },[groupId]);
    return{entries,loading,fetchEntries};
};