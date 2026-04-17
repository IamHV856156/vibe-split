import { useEntries } from "@/features/entries/useEntries";
import { calculateBalance, calculateSplit } from "@/utils/calculation";
import { calculateSettlement } from "@/utils/settelment";
import { useMembers } from "@/features/members/useMembers";
import { Card, CardContent } from "@/components/ui/card";

const Summary = ({groupId}) =>{
    const { entries, loading} = useEntries(groupId);
    const {totalExpense, totalSaving, balance} = calculateBalance(entries);
    const {totalExpense: splitExpense, perPerson, balances} = calculateSplit(entries);
    const settlment = calculateSettlement(entries);
    const { members } = useMembers(groupId);

    const userMap = Object.fromEntries(
        members.map(m => [m.id, m.name])
    );
  
    if (loading) {
        return (<p className="text-gray-400">Loading summary....</p>);
    }
    return(            
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Summary */}
                {/* total expense,saving(jo admin set kar sakega foe each member in his group) and remaing balance */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-4 space-y-2 text-white">
                    <h2 className="text-lg font-semibold">Summary</h2>
                    <p className="text-red-400">Total Paid: INR{totalExpense}</p>
                    <p className="text-emerald-400">Saving: INR{totalSaving}</p>
                    <p className="font-medium text-blue-400">Balance: INR{balance}</p>
                </CardContent>
                </Card>
    
                {/* Split Summary */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-4 space-y-2 text-white">
                    <h3 className="text-lg font-semibold">Split Summary</h3>
    
                    <p>Total Expense: INR{splitExpense}</p>
                    <p>Per Person: INR{Number(perPerson).toFixed(2)}</p>
    
                    <div className="space-y-1">
                    {Object.entries(balances).map(([user,amount])=>(
                        <p key={`balance-${user}`} className=" flex justify-between text-sm">
                            <span>{user.slice(0,15)}  :</span> 
                            <span className={amount >0 ? "text-green-600 ml-1" : "text-red-600 ml-1"}>
                                {amount >0 ? `gets INR ${amount.toFixed(2)}` : `owes INR ${Math.abs(amount.toFixed(2))}`}
                            </span>
                        </p>
                    ))}
                    </div>
                </CardContent>
                </Card>
    
                {/* settlment view */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-4 space-y-2 text-white">
                    <h3 className="text-lg font-semibold">Settlment</h3>
                    {settlment?.length === 0 ? (
                        <p className="text-emerald-400">All Settled</p>
                    ):(
                        settlment?.map((s,i)=>{
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
                </CardContent>
                </Card>
            </div>
        </div>
    );
};
export default Summary;