import { useAuth } from "@/context/authContext";
import { useGroups } from "../useGroups";
import GroupCard from "../components/groupCard";
import EmptyState from "@/components/ui/custom/EmptyState";
import { useNavigate } from "react-router-dom";
import CreateGroup from "../components/createGroup";

export default function GroupList(){
    const {user} = useAuth();
    const {groups,loading} = useGroups(user?.id);
    const navigate = useNavigate();
    if (loading) {
    return (
    <p className="text-gray-400">Loading groups...</p>);
    }
    return(
        <div className="w-full px-4 md:px-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Your Groups</h1>
                <CreateGroup onGroupCreated={()=>window.location.reload()}/>
            </div>
                {/* Empty State */}
                {groups.length === 0 ? (
                    <EmptyState title="No groups found ('~')" 
                                description="Create or join a group to get started"
                                actionLabel="Create Group"
                                onAction={()=> <CreateGroup onClick={()=>setOpen(true)}/>} />
                            ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {groups.map((g) => (
                                    <div key={g.id} className="cursor-pointer hover:scale-[1.02] transition"
                                    >
                                        <GroupCard group={g} />
                                    </div>
                                ))}
                            </div>
                            )}
        </div>
    );
}