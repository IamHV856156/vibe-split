import { useState } from "react";
import { createGroup } from "../groupServices";
import { useAuth } from "@/context/authContext";

export default function CreateGroup(){
    const[name,setName]=useState("");
    const {user} = useAuth();

    const handleCreate = async ()=>{
      const{error} = await createGroup(name,user.id);
      if(error){
        alert(error.message);
      }else{
        alert("Group created");
        setName("");
      }
  }  

return(
    <div>
        <input placeholder="Group Name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <button onClick={handleCreate}>Create Group</button>
    </div>
);
};