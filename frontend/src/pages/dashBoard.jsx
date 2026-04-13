import { useAuth } from "@/context/authContext";
import { useGroups } from "@/features/groups/useGroups";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Handshake, PlusCircle, TrendingUp, Users, Wallet } from "lucide-react";
import GroupCardSmall from "@/components/ui/custom/groupCardModal";
import StatCard from "@/components/ui/custom/StatCard";
import EmptyState from "@/components/ui/custom/EmptyState";
import EntryList from "@/features/entries/components/entryList";


export default function Dashboard() {
  const{user} = useAuth();
  const { groups = []} = useGroups(user?.id);
  const navigate = useNavigate();
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
    {/* header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-400">Welcome Back <Handshake size={24}/> </p>
      </div>
        <Button onClick={()=> navigate("/groups")} className="rounded-xl gap-2 shadow-sm hover:scale-105 transition bg-white gap-2 text-black hover:bg-gray-200">
          <PlusCircle size={20}/> Create Group
        </Button>
      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Groups" value={groups.length} icon={<Users size={24}/>}/>
        <StatCard title="Total Expense" value={groups.length} icon={<Wallet size={24}/>}/>
        <StatCard title="Total Balance" value={groups.length} icon={<TrendingUp size={24}/>}/>
      </div>
      {/* GROUPS */}
      <div className="space-y-4">
        <h2 className="text-xl">Your Groups</h2>
        {groups.length === 0 ? (
          <EntryList title="No groups found ('~')" 
          description="Create or join a group to get started"
                     actionLabel="Create Group"
                     onAction={()=>navigate("/groups")} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((g) => (
              <GroupCardSmall key={g.id} group={g} />
            ))}
          </div>
        )}
      </div>
      </div>
    // </div>
  );
}