import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Handshake, PlusCircle, TrendingUp, Users, Wallet } from "lucide-react";
import GroupCardSmall from "@/components/ui/custom/groupCardModal";
import StatCard from "@/components/ui/custom/StatCard";
import EmptyState from "@/components/ui/custom/EmptyState";
import { useGroups } from "@/features/groups/useGroups";
import useDashbordstat from "@/hooks/useUsers";
import CreateGroup from "@/features/groups/components/createGroup";

export default function Dashboard() {
  const{user} = useAuth();
  const {groups} = useGroups(user.id);
  const navigate = useNavigate();
  const { stats } = useDashbordstat();
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
    {/* header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-400"><Handshake size={24}/> Welcome Back</p>
      </div>
      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <StatCard title="Total Groups" value={stats.totalGroups} icon={<Users size={24}/>}/>
        <StatCard title="Total Expense" value={stats.totalExpense} icon={<Wallet size={24}/>}/>
        <StatCard title="Total Balance" value={stats.TotalBalance} icon={<TrendingUp size={24}/>}/>
      </div>
      {/* GROUPS */}
      <div className="space-y-4 mt-6">
        <div className="flex justify-between items-center">
        <h2 className="text-xl">Your Groups</h2>
        {/* <Button onClick={()=> navigate("/add-groups")} className="rounded-xl gap-2 shadow-sm hover:scale-105 transition bg-white/80 gap-2 text-black hover:bg-gray-200">
          <PlusCircle size={20}/> Create Group
        </Button>
         */}
         <CreateGroup onGroupCreated={()=> window.location.reload()}/>
        </div>
        {groups === 0 ? (
          <EmptyState title="No groups found ('~')" 
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