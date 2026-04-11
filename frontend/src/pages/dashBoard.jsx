import { useAuth } from "@/context/authContext";
import { useGroups } from "@/features/groups/useGroups";
import GroupCard from "@/features/groups/components/GroupCard";

export default function Dashboard() {
  const{user} = useAuth();
  const { groups, loading } = useGroups(user?.id);
  if (loading) {
    return(<p>Loading...</p>);
  }
  if (groups.length === 0) {
    return(<p>No groups yet</p>);
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="space-y-6">
          {groups.map((g) => (
            <GroupCard key={g.id} group={g} />
            ))}
        </div>
      </div>
    </div>
  );
}