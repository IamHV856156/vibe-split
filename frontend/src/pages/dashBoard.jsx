import { useAuth } from "@/context/authContext";
import { useEffect,useState } from "react";
import { getGroups } from "@/features/groups/groupServices";
import CreateGroup from "@/features/groups/components/createGroup";
import { logOut } from "@/features/auth/authServices";
import EntryList from "@/features/entries/components/entryList";
import AddEnrtyModal from "@/features/entries/components/addEnrtyModal";

export default function Dashboard(){
    const {user} =useAuth();
    const [groups,setGroups] = useState([]);
    const [reload,setReload] = useState(0);

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
            <h3>Your Groups:</h3>
            {groups.map((g)=>(
                <div key={g.id} >
                    <p>{g.name}</p>
                    <AddEnrtyModal groupId={g.id} onEntryAdded={()=> setReload((prev)=>prev+1)}/>
                    <EntryList groupId={g.id} reloading={reload}/>
                    <p>Invite Link: http://localhost:5173/join/{g.invite_code}</p>
                </div>
            ))}
        </div>
    );
}