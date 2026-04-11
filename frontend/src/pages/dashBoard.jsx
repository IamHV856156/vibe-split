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
  console.log("GROUPS STATE:", groups);
  return (
    <div>
      <h2>Dashboard</h2>
      {groups.map((g) => (
        <GroupCard key={g.id} group={g} />
      ))}
    </div>
  );
}