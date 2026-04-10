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

    // useEffect(()=>{
    //     if(user?.id){
    //         fetchGroups();
    //     }
    // },[user?.id]);

    const fetchGroups = async ()=>{
        const {data,error} = await getGroups(user.id);
         console.log("GROUP RAW DATA:", data, error);
        if(!error){
            setGroups(data.map((item)=> item.groups).filter(Boolean));
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
                    <AddEnrtyModal groupId={g.id}/>
                    <EntryList groupId={g.id} isAdmin={user.id === g.created_by}/>
                    <p>Invite Code: {g.invite_code}</p>
                </div>
            ))}
        </div>
    );
}