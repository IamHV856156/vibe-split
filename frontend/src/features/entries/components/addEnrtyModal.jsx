import { useState } from "react";
import { addEntry } from "../entryService";
import { useAuth } from "@/context/authContext";
const AddEnrtyModal = ({groupId}) =>{
    const {user} = useAuth();
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expenses");
    const [desc, setDesc] = useState("");

    const handleAdd = async () =>{
        const {error} = await  addEntry({
            group_id:groupId,
            user_id:user.id,
            amount: Number(amount),
            type,
            description: desc,
        });
        if (error) {
         alert(error.message);   
        }else{
            alert("Entry added");
        };
    };

    return(
        <div>
            <input placeholder="Amount" onChange={(e)=> setAmount(e.target.value)}/>
            <select onChange={(e)=> setType(e.target.value)}>
                <option value="expense">Expense</option>
                <option value="saving">Saving</option>
            </select>
            <input placeholder="Description" onChange={(e) => setDesc(e.target.value)}/>
            <button onClick={handleAdd}>Add</button>
        </div>
    );
};
export default AddEnrtyModal;