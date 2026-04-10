import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabaseClient";
import { useAuth } from "@/context/authContext";

export default function JoinGroup(){
    const [code,setCode] = useState("");
    const {user} = useAuth();
    const navigate = useNavigate();

    const handleJoin = async () =>{
        //find group
        const {data: group,error:groupError} = await supabase.from("groups").select("*").eq("invite_code",code).maybeSingle();
        console.log("Group Found:", group,groupError);
        console.log("Code:",code);
        if(!group){
            return alert("Invalid invite");
        }

        //add members
        const {error: joinError} = await supabase.from("members").insert([
            {
                user_id:user.id,
                group_id:group.id,
            },
        ]);
        console.log("Join Error",joinError);

        if (joinError) {
            return alert(joinError.message);
        }

        alert(`Joined Group : ${group.name}`);

        // after join member will we send to dashboard
        navigate("/dashboard");
    };
    return(
        <div>
            <h2>Join Group</h2>
            <input placeholder="Enter Code" value={code} onChange={(e)=> setCode(e.target.value)}/>
            <button onClick={handleJoin}>Join Now</button>
        </div>
    );
}