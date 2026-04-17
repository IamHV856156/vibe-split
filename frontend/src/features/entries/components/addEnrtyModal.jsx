import { useState } from "react";
import { addEntry } from "../entryService";
import { useAuth } from "@/context/authContext";
import { Dialog,DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const AddEnrtyModal = ({groupId}) =>{
    const {user} = useAuth();
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("collect");
    const [desc, setDesc] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAdd = async () =>{
        if (!amount || !desc) {
            return(alert("Please fill all fields"));
        }
        setLoading(true);
        const {error} = await  addEntry({
            group_id:groupId,
            user_id:user.id,
            amount: Number(amount),
            type:type.toLowerCase(),
            description: desc,
        });

        if (error) {
         alert(error.message);  
         setLoading(false); 
        }else{
            alert("Entry added");
            setAmount("");
            setDesc("");
            setType("collect");
            setOpen(false);
            setLoading(false);
        }
    };

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-xl gap-2 shadow-sm hover:scale-105 transition bg-white/80 text-black hover:bg-gray-200">
                <PlusCircle size={20}/> Add Entry
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-white text-lg">Add New Entry</DialogTitle>
                    <DialogDescription className="text-gray-400">Add a new collect or expense entry to this group</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                    {/* amount */}
                    <Input placeholder="Enter Amount" type="number" onChange={(e)=> setAmount(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"/>
                    {/* type */}
                    <div className="flex gap-3">
                      <Button onClick={() => setType("collect")} 
                            className={`flex-1 py-2 rounded-xl border transition ${
                                type === "collect" ? 
                                "bg-emerald-500/20 border-emerald-400 text-emerald-400" : 
                                "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                            }`}
                      >
                        Collected
                      </Button>
        
                      <Button onClick={() => setType("spend")}
                        className={`flex-1 py-2 rounded-xl border transition ${
                            type === "spend" ? 
                            "bg-red-500/20 border-red-400 text-red-400" : 
                            "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                        }`}
                      >
                        Spend
                      </Button>
                    </div>
                    {/* description */}
                    {type === "collect" ? 
                    (
                        <Input placeholder="paid for what ?" value={desc} onChange={(e) => setDesc(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"/>
                    ) : (
                        <Input placeholder="Where did money going" value={desc} onChange={(e) => setDesc(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"/>
                    )}
                    
                    {/* submit */}
                    <Button onClick={handleAdd} disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl">
                       {loading ? "Adding..." : "Add Entry"}</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
export default AddEnrtyModal;