import { useEffect,useState } from "react";
import { useAuth } from "@/context/authContext";
import { useEntries } from "../useEntries";
import { calculateBalance, calculateSplit } from "@/utils/calculation";
import { calculateSettlement } from "@/utils/settelment";
import { useMembers } from "@/features/members/useMembers";
import EditEntryModal from "./editEntryModal";
const EntryList = ({groupId,isAdmin}) =>{
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
        <div className="space-y-6">
            {/* Summary */}
            {/* total expense,saving(jo admin set kar sakega foe each member in his group) and remaing balance */}
            <div className="bg-white rounded-2xl shadow p-4 space-y-2">
                <h2 className="text-lg font-semibold">Summary</h2>
                <p>Total Paid: INR{totalExpense}</p>
                <p>Saving: INR{totalSaving}</p>
                <p className="font-medium">Balance: INR{balance}</p>
            </div>
            {/* Split Summary */}
            <div className="bg-white rounded-2xl shadow p-4 space-y-2">
                <h3 className="text-lg font-semibold">Split Summary</h3>
                <p>Total Expense: INR{splitExpense}</p>
                <p>Per Person: INR{Number(perPerson).toFixed(2)}</p>
                <div className="space-y-1">
                {Object.entries(balances).map(([user,amount])=>(
                    <p key={`balance-${user}`} className="text-sm">
                        {user.slice(0,15)} : 
                        <span className={amount >0 ? "text-green-600 ml-1" : "text-red-600 ml-1"}>
                            {amount >0 ? `gets INR ${amount}` : `owes INR ${Math.abs(amount)}`}
                        </span>
                    </p>
                ))}
                </div>
            </div>
            {/* settlment view */}
            <div className="bg-white rounded-2xl shadow p-4 space-y-2">
                <h3 className="text-lg font-semibold">Settlment</h3>
                {settlment.length === 0 ? 
                (<p className="text-green-600">All Settled</p>):(settlment.map((s,i)=>{
                            return(
                                <p key={`${s.from}-${s.to}-${i}`} className="text-sm">
                                    <span className="font-medium">
                                        {userMap[s.from] || "Unknown"}
                                    </span>
                                    {" "} pays INR {Math.round(s.amount)} to{" "}
                                    <span className="font-medium">
                                        {userMap[s.to] || "Unknown"}
                                    </span>
                                </p>
                            );
                        })
                    )}
            </div>
            {/* entries view */}
            <div className="space-y-3">
            <h4 className="text-lg font-semibold">Entries</h4>
            <EditEntryModal entry={editingEntry} onClose={() => setEditingEntry(null)} onSave={updateEntry}/>
            {entries.map((e)=>{
                const isOwned = e.user_id === user?.id;
                const isSaving = e.type === "saving";
                return(
                <div key={`entry-${e.id}-${e.user_id}`} className="bg-white rounded-xl shadow p-3 flex justify-between items-center">
                    <div>
                        <p className="font-medium">{e.type} - INR{e.amount}</p>
                        <p className="text-sm text-gray-500">{e.description}</p>
                    </div>
                    <div className="flex gap-2">
                    <button onClick={() => deleteEntry(e.id)} className="px-2 py-1 text-sm bg-red-500 text-white rounded">Delete</button>
                    {(isAdmin || (isOwned && !isSaving)) ?(<button onClick={() => setEditingEntry(e)} className="px-2 py-1 text-sm bg-blue-500 text-white rounded">Edit</button>
                    ):(
                        <span className="text-xs text-gray-400">Locked</span>
                    )}
                    </div>
                </div>
                
                );
            })}
            </div>
        </div>
    );
};
export default EntryList;