import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabaseClient";
import { useAuth } from "@/context/authContext";
import { joinGroups } from "@/features/groups/groupServices";

export default function JoinGroup(){
    const [code,setCode] = useState("");
    const {user} = useAuth();
    const navigate = useNavigate();

    const handleJoin = async () =>{
        //find group
        const {error} = await joinGroups(code,user.id);

        if (error) {
            alert(error.message);
        }else{
            alert("Joined successfully!");
        };
        // after join member will we send to dashboard
        navigate("/dashboard");
    };
    return(
        <div>
            <h2>Join Group</h2>
            <input placeholder="Enter Invite Code" value={code} onChange={(e)=> setCode(e.target.value)}/>
            <button onClick={handleJoin}>Join Now</button>
        </div>
    );
}