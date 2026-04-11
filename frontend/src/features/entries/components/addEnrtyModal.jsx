import { useState } from "react";
import { addEntry } from "../entryService";
import { useAuth } from "@/context/authContext";
import { Dialog,DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
const AddEnrtyModal = ({groupId}) =>{
    const {user} = useAuth();
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [desc, setDesc] = useState("");
    const [open, setOpen] = useState("");

    const handleAdd = async () =>{
        const {error} = await  addEntry({
            group_id:groupId,
            user_id:user.id,
            amount: Number(amount),
            type:type.toLowerCase(),
            description: desc,
        });
       
        if (error) {
         alert(error.message);   
        }else{
            alert("Entry added");
            setAmount("");
            setDesc("");
            setType("expense");
        }
    };

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Entry</DialogTitle>
                    <input placeholder="Amount" onChange={(e)=> setAmount(e.target.value)}/>
                    <select value={type} onChange={(e)=> setType(e.target.value)}>
                        <option value="expense">Expense</option>
                        <option value="saving">Saving</option>
                        </select>
                        <input placeholder="Description" onChange={(e) => setDesc(e.target.value)}/>
                        <button onClick={handleAdd}>Add</button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
export default AddEnrtyModal;