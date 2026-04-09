import { useAuth } from "@/context/authContext";
import { useEffect,useState } from "react";
import { getGroups } from "@/features/groups/groupServices";
import CreateGroup from "@/features/groups/components/createGroup";
import { supabase } from "@/services/supabaseClient";

export default function Dashboard(){
    const {user} =useAuth();
    const [groups,setGroups] = useState([]);

    useEffect(()=>{
        if(user?.id){
            fetchGroups();
        }
    },[user?.id]);

    const fetchGroups = async ()=>{
        const {data,error} = await getGroups(user.id);
        if(!error){
            setGroups(data);
        };
    }
    return(
        <div>
            <h2>DashBoard</h2>
            <p>Welcome {user?.email}</p>

            <button onClick={async() => await supabase.auth.signOut()}>Logout</button>

            <h3>Create Group</h3>
            <CreateGroup/>

            <h3>Your Groups:</h3>
            {groups.map((g)=>(
                <div key={g.id} >{g.name}</div>
            ))}
        </div>
    );
}