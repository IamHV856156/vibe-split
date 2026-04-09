import { useParams,useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabaseClient";
import { useAuth } from "@/context/authContext";

export default function JoinGroup(){
    const {code} = useParams();
    const {user} = useAuth();
    const navigate = useNavigate();

    const handleJoin = async () =>{
        //fing group
        const {data: group} = await supabase.from("groups").select("*").eq("invite_code",code).single();

        if(!group){
            return alert("Invalid invite");
        }

        //add members
        const {error} = await supabase.from("members").insert([
            {
                user_id:user.id,
                group_id:group.id,
            },
        ]);

        if (error) {
            return alert(error.message);
        }

        alert(`Joined Group : ${group}`);

        // after join member will we send to dashboard
        navigate("/dashboard");
    };
    return(
        <div>
            <h2>Join Group</h2>
            <p>Invite Code:{code}</p>
            <button onClick={handleJoin}>Join Now</button>
        </div>
    );
}