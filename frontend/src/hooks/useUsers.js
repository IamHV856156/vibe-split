import { useEffect, useState } from "react";
import { getEntries } from "@/features/entries/entryService";
import { calculateBalance } from "@/utils/calculation";
import { useGroups } from "@/features/groups/useGroups";
import { useAuth } from "@/context/authContext";

export default function useDashbordstat() {
  const { user } = useAuth();
  const { groups = [] } = useGroups(user?.id);
  const [stats, setStats] = useState({
    totalGroups: 0,
    totalExpense: 0,
    TotalBalance: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        let allEntries = [];
        for (const group of groups) {
          const groupId = group?.id;
          // if group id is undefined or not in string type then this will tell use
          if (!groupId || typeof groupId !== "string") {
            console.warn("invalid group:", group);
            continue;
          }
          // fetching all entries of groups in which user is persent
          const { data } = await getEntries(groupId);
          allEntries.push(...(data || []));
        }
        
        const { totalExpense, balance } =
          calculateBalance(allEntries);

        setStats({
          totalGroups: groups.length,
          totalExpense,
          TotalBalance: balance,
        });

      } catch (err) {
        console.error("Dashboard Stats Error:", err);
      }
    };

    if (groups.length > 0) {
      fetchStats();
    }
  }, [groups]);
  return { stats };
}