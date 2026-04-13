import { useAuth } from "@/context/authContext";
import { useGroups } from "../useGroups";
import GroupCard from "../components/groupCard";

export default function GroupList(){
    const {user} = useAuth();
    const {groups, loading} = useGroups(user?.id);

    if(loading){
        return(<p>Loading groups...</p>);
    }
    if(!groups.length){
        return(<p className="text-gray-500">No groups found</p>);
    }

    return(
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Your Groups</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups.map((g)=>(<GroupCard key={g.id} group={g}/>
            ))}
            </div>
        </div>
    );
}