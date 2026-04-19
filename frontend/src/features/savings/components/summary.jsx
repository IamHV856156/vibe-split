import { useEntries } from "@/features/entries/useEntries";
import { calculateBalance, calculateSplit } from "@/utils/calculation";
import { calculateSettlement } from "@/utils/settelment";
import { useMembers } from "@/features/members/useMembers";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatter";
import SavingsCard from "@/features/savings/components/savingCard";

const Summary = ({groupId}) =>{
    const { entries, loading} = useEntries(groupId);
    const { members } = useMembers(groupId);
    const uniqueMember = Array.from(new Map(members.map((m)=>[m.id,m])).values());
    const {totalExpense, totalCollected, balance} = calculateBalance(entries,uniqueMember);
    const settlment = calculateSettlement(entries,uniqueMember.length);
    const {totalSpend, perPerson, balances} = calculateSplit(entries);
    
    const userMap = Object.fromEntries(
        members.map(m => [m.id, m.name])
    );
  
    if (loading) {
        return (<p className="text-gray-400">Loading summary....</p>);
    }
    return(            
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Summary */}
                {/* total expense,saving(jo admin set kar sakega foe each member in his group) and remaing balance */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-4 space-y-2 text-white">
                    <h2 className="text-lg font-semibold border-b border-white/10 pb-1">Summary</h2>
                        <div>
                            <p className="flex justify-between text-sm">
                                <span className="text-gray-400">Total Collected:</span>
                                <span className="text-emerald-400">{formatCurrency(totalCollected)}</span>
                            </p>
                            <p className="flex justify-between text-sm">
                                <span className="text-gray-400">Total Spend:</span>
                                <span className="text-red-400">{formatCurrency(totalExpense)}</span>
                            </p>
                            <hr className="border-white/5 my-2"/>
                            <p className="flex justify-between font-bold">
                                <span className="text-gray-400">Remaining:</span>
                                <span className="text-blue-400">{formatCurrency(balance)}</span>
                            </p>
                        </div>
                </CardContent>
                </Card>
    
                {/* Split Summary */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-4 space-y-2 text-white">
                    <h3 className="text-lg font-semibold border-b border-white/10 pb-1">Split Summary</h3>
                    <p className="text-sm pt-2 flex justify-between items-center">Total Spend:
                        <span className="font-bold">{formatCurrency(totalExpense)}</span> 
                    </p>
                    <p className="text-sm text-gray-400 italic flex justify-between items-center">Divided By {uniqueMember.length} members: 
                        <span className="text-sm font-bold text-white mt-2">{formatCurrency(perPerson)}</span>
                    </p>
                </CardContent>
                </Card>
    
                {/* settlment view */}
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-4 space-y-2 text-white">
                    <h3 className="text-lg font-semibold border-b border-white/10 pb-1">Settlment</h3>
                    <div className="pt-2 space-y-3">
                        {settlment?.length === 0 ? (
                            <p className="text-emerald-400 text-sm italic">All Settled <span>('-')</span></p>
                        ):(
                            settlment?.map((s,i)=>{
                                return(
                                <div key={`${s.from}-${s.to}-${i}`} className="text-sm bg-white/5 p-2 rounded-lg border border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400 font-medium">
                                            {userMap[s.from] || "Unknown"}
                                        </span> 
                                        <span className="text-gray-400 text-xs">
                                            pays 
                                        </span>
                                        <span className="text-emerald-400font-medium">
                                            {userMap[s.to] || "Unknown"}
                                        </span>
                                    </div>
                                    <div className="text-center font-bold text-white mt-1">
                                        {formatCurrency(Math.round(s.amount))} to{" "}
                                    </div>
                                </div>
                                );
                            })
                        )}
                    </div>
                </CardContent>
                </Card>
                {/* Saving per person */}
                <SavingsCard entries={entries}/>
            </div>
        </div>
    );
};
export default Summary;