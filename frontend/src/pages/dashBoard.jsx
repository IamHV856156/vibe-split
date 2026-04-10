import { useGroups } from "@/features/groups/useGroups";
import GroupCard from "@/features/groups/components/GroupCard";

export default function Dashboard() {
  const { groups } = useGroups();

  return (
    <div>
      <h2>Dashboard</h2>

      {groups.map((g) => (
        <GroupCard key={g.id} group={g} />
      ))}
    </div>
  );
}