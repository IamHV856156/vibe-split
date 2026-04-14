import { useAuth } from "@/context/authContext";
import { useGroups } from "../useGroups";
import GroupCardSmall from "@/components/ui/custom/groupCardModal";
import EmptyState from "@/components/ui/custom/EmptyState";
import { useNavigate } from "react-router-dom";

export default function GroupList(){
    const {user} = useAuth();
    const {groups, loading} = useGroups(user?.id);
    const navigate = useNavigate();

    if(loading){
        return(<p>Loading groups...</p>);
    }
    if(!groups.length){
        return(<p className="text-gray-500">No groups found</p>);
    }

    return(
        <div className="w-full px-4 md:px-6 space-y-6">
            <h1 className="text-2xl font-bold text-white">Your Groups</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Empty State */}
                {groups.length === 0 ? (
                    <EmptyState title="No groups found ('~')" 
                                description="Create or join a group to get started"
                                actionLabel="Create Group"
                                onAction={()=>navigate("/groups")} />
                            ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {groups.map((g) => (
                                    <div key={g.id} 
                                        onClick={() => navigate(`/group/${g.id}`)} 
                                        className="cursor-pointer hover:scale-[1.02] transition"
                                    >
                                        <GroupCardSmall group={g} />
                                    </div>
                                ))}
                            </div>
                            )
                        }
            </div>
        </div>
    );
}