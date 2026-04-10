import { useEffect } from "react";
import { useEntries } from "../useEntries";
const EntryList = ({groupId,reloading}) =>{
    const {entries,loading,fetchEntries} = useEntries(groupId);
    useEffect(()=>{
        fetchEntries();
    },[reloading]);
    if (loading) {
        return (<p>Loading entries....</p>);
    }
    if (!loading && entries.length === 0) {
        return (<p>No entries found.</p>);
    }
    console.log("group:",groupId);
    return(
        <div>
            <p>Total entries: {entries.length}</p>
            {entries.map((e)=>{
                console.log("Entry:",e);

                return(
                <div key={e.id}>
                    <p>{e.type} - INR{e.amount}</p>
                    <p>{e.description}</p>
                </div>
                );
            })}
        </div>
    );
};
export default EntryList;