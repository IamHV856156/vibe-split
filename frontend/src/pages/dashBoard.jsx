import { useAuth } from "@/context/authContext";
import CreateGroup from "@/features/groups/components/createGroup";
import { logOut } from "@/features/auth/authServices";
import { useGroups } from "@/features/groups/useGroups";
import GroupCard from "@/features/groups/components/groupCard";

export default function Dashboard(){
    const {user} =useAuth();
    const {groups,loading, fetchGroups} = useGroups(user?.id);

    const handleLogout = async () =>{
        const {error} = await logOut();
        if (error) {
            console.log("Logout Error:",error);
        }
    };
    if(loading){
        return(<p>Loading groups...</p>);
    }

    return(
        <div>
            <h2>DashBoard</h2>
            <p>Welcome {user?.email}</p>

            <button onClick={handleLogout}>Logout</button>

            <h3>Create Group</h3>
            <CreateGroup onGroupCreated={fetchGroups} />
            <h3>Your Groups:</h3>
            {groups.map((g)=>(
                <GroupCard key={g.id} group={g} user={user}/>
            ))}
        </div>
    );
}