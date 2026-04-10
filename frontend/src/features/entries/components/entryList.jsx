import { useEffect,useState } from "react";
import { useAuth } from "@/context/authContext";
import { useEntries } from "../useEntries";
import { calculateBalance, calculateSplit } from "@/utils/calculation";
import { calculateSettlement } from "@/utils/settelment";
import { useMembers } from "@/features/members/useMembers";
import EditEntryModal from "./editEntryModal";
const EntryList = ({groupId,reloading,isAdmin}) =>{
    const { entries, loading, fetchEntries, deleteEntry, updateEntry } = useEntries(groupId);
    const {totalExpense, totalSaving, balance} = calculateBalance(entries);
    const {totalExpense: splitExpense, perPerson, balances} = calculateSplit(entries);
    const [editingEntry, setEditingEntry] = useState(null);
    const settlment = calculateSettlement(entries);
    const { members } = useMembers(groupId);
    const {user} = useAuth();

    const userMap = Object.fromEntries(
        members.map(m => [m.id, m.name])
    );
  
    if (loading) {
        return (<p>Loading entries....</p>);
    }
    if (!loading && entries.length === 0) {
        return (<p>No entries found.</p>);
    }
    return(
        <div>
            {/* total expense,saving(jo admin set kar sakega foe each member in his group) and remaing balance */}
            <div>
                <p>Total Paid: INR{totalExpense}</p>
                <p>Saving: INR{totalSaving}</p>
                <p>Balance: INR{balance}</p>
            </div>
            {/* Split Summary */}
            <div>
                <h3>Split Summary</h3>
                <p>Total Expense: INR{splitExpense}</p>
                <p>Per Person: INR{Number(perPerson).toFixed(2)}</p>
                {Object.entries(balances).map(([user,amount])=>(
                    <p key={user}>
                        {user.slice(0,15)} : {amount >0 ? `gets INR ${amount}` : `owes INR ${Math.abs(amount)}`}
                    </p>
                ))}
            </div>
            {/* settlment view */}
            <div>
                <h3>Settlment</h3>
                {settlment.length === 0 ? 
                (<p>All Settled</p>):(settlment.map((s,i)=>{
                            return(
                                <p key={i}>
                                    {userMap[s.from] || "Unknown"} pays INR {Math.round(s.amount)} to{" "}
        {userMap[s.to] || "Unknown"}
                                </p>
                            );
                        })
                    )}
            </div>
            {/* entries view */}
            <h4>Entries</h4>
            <EditEntryModal entry={editingEntry} onClose={() => setEditingEntry(null)} onSave={updateEntry}/>
            {entries.map((e)=>{
                const isOwned = e.user_id === user?.id;
                const isSaving = e.type === "saving";
                return(
                <div key={e.id}>
                    <p>{e.type} - INR{e.amount}</p>
                    <p>{e.description}</p>
                    <button onClick={() => deleteEntry(e.id)}>Delete</button>
                    {(isAdmin || (isOwned && !isSaving)) ?(<button onClick={() => setEditingEntry(e)}>Edit</button>
                    ):(
                        <p>Only Admin can Edit savings</p>
                    )}
                </div>
                
                );
            })}
        </div>
    );
};
export default EntryList;