import { useEffect } from "react";
import { useEntries } from "../useEntries";
import { calculateBalance, calculateSplit } from "@/utils/calculation";
import { calculateSettelment } from "@/utils/settelment";
const EntryList = ({groupId,reloading,isAdmin}) =>{
    const {entries,loading,fetchEntries} = useEntries(groupId);
    const {totalExpense, totalSaving, balance} = calculateBalance(entries);
    const {totalExpense: splitExpense, perPerson, balances} = calculateSplit(entries);
    const settlment = calculateSettelment(balances);
    useEffect(()=>{
        fetchEntries();
    },[reloading]);
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
                (<p>All Settled</p>):(settlment.map((s,i)=>(
                    <p key={i}>
                        {s.from} - pays INR{s.amount} - {s.to}
                    </p>
                ))
            )}
            </div>
            {/* entries view */}
            <h4>Entries</h4>
            {entries.map((e)=>{
                const isSaving = e.type === "saving";
                return(
                <div key={e.id}>
                    <p>{e.type} - INR{e.amount}</p>
                    <p>{e.description}</p>

                    {isSaving && !isAdmin ?(
                        <p>Only Admin can Edit savings</p>
                    ):(<button>Edit</button>)}
                </div>
                );
            })}
        </div>
    );
};
export default EntryList;