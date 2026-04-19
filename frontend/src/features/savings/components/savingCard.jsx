import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatter";

export default function SavingsCard({ entries }){
    // 1. Calculate Individual Savings Logic
    const userSaving = {};
    entries.forEach((e) => {
        const userName = e.profiles?.name || "Unknown";
        const amount = Number(e.amount);

        if (!userSaving[userName]) {
            userSaving[userName] = { collected: 0, spent: 0 };
        }

        if (e.type === "collect") {
            userSaving[userName].collected += amount;
        } else if (e.type === "spend") {
            userSaving[userName].spent += amount;
        }
    });

    const individualSavings = Object.keys(userSaving).map((name) => {
        const { collected, spent } = userSaving[name];
        const balance = collected - spent;
        return {
            name,
            deservedBack: balance > 0 ? balance : 0,
        };
    });

    return (
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-4 space-y-2 text-white">
                <h3 className="text-lg font-semibold tracking-tight border-b border-white/10 pb-1">
                    Individual Balance
                </h3>
                <div className="pt-2 space-y-2">
                    {individualSavings.filter(s => s.deservedBack > 0).length === 0 ? (
                        <p className="text-gray-400 text-xs italic">No individual savings yet.</p>
                    ) : (
                        individualSavings.map((s, i) => (
                            s.deservedBack > 0 && (
                                <div key={i} className="flex justify-between items-center bg-white/5 p-2 rounded-lg border border-white/5">
                                    <span className="text-sm text-gray-300">{s.name}: </span>
                                    <span className="text-sm font-bold text-emerald-400">
                                        {formatCurrency(s.deservedBack)}
                                    </span>
                                </div>
                            )
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
};