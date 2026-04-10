import { useAuth } from "@/context/authContext";
import { useEffect,useState } from "react";
import { getGroups } from "@/features/groups/groupServices";
import CreateGroup from "@/features/groups/components/createGroup";
import { supabase } from "@/services/supabaseClient";
import { logOut } from "@/features/auth/authServices";

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

    const testInsert = async () => {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;
        const { error } = await supabase.from("profiles").insert([
            {
                id: user.id,
                name: "Test User 2",
            },]);
            console.log("TEST INSERT ERROR:", error);
    };

    const handleLogout = async () =>{
        const {error} = await logOut();
        if (error) {
            console.log("Logout Error:",error);
        }
    };
    return(
        <div>
            <h2>DashBoard</h2>
            <p>Welcome {user?.email}</p>

            <button onClick={handleLogout}>Logout</button>

            <h3>Create Group</h3>
            <CreateGroup onGroupCreated={fetchGroups} />
            <button onClick={testInsert}>Test Profile Insert</button>
            <h3>Your Groups:</h3>
            {groups.map((g)=>(
                <div key={g.id} >
                    <p>{g.name}</p>
                    <p>Invite Link: http://localhost:5173/join/{g.invite_code}</p>
                </div>
            ))}
        </div>
    );
}