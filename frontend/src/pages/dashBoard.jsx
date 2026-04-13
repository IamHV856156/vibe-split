import { useAuth } from "@/context/authContext";
import { useGroups } from "@/features/groups/useGroups";
import GroupCard from "@/features/groups/components/GroupCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GroupCardSmall from "@/features/groups/components/groupCardModal";

const StateCard =({title,value})=>{
  return(
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-4">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-xl font-semibold">{value}</h2>
      </CardContent>
    </Card>
  );
};

const EmptyState = () =>{
  return(
    <div className="text-center py-10 border rounded-2xl">
      <p className="text-gray-50 mb-3">No groups found</p>
      <p className="text-sm text-gray-400">Create or join a group to get started</p>
    </div>
  );
};

export default function Dashboard() {
  const{user} = useAuth();
  const { groups, loading } = useGroups(user?.id);
  const navigate = useNavigate();
  if (loading) {
    return(<p>Loading...</p>);
  }
  if (groups.length === 0) {
    return(<p>No groups yet</p>);
  }
  return (
    <div className="space-y-6 p-6">
      {/* header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button onClick={()=> navigate("/groups")}>
          <PlusCircle size={20}/> Create Group
        </Button>
      </div>
      {/* stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <StateCard title="Total Groups" value={groups.length}/>
        <StateCard title="Total Expence" value={groups.length}/>
        <StateCard title="Total Balance" value={groups.length}/>
      </div>
      {/* GROUPS */}
      <div>
        <h2 className="font-semibold text-lg mb-3">Your Groups</h2>
        {groups.length === 0 ? (<EmptyState/>) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((g) => (
            <GroupCardSmall key={g.id} group={g} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}