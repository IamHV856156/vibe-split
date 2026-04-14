import { useParams } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { useMembers } from "@/features/members/useMembers";
import EntryList from "@/features/entries/components/entryList";
import AddEnrtyModal from "@/features/entries/components/addEnrtyModal";
import MemberList from "@/features/members/components/MemberList";
import { List, Users } from "lucide-react";
import { Card,CardContent } from "@/components/ui/card";

export default function GroupDetails() {
  const {groupId} = useParams();
  const {user} = useAuth();
  const { members } = useMembers(groupId);
  const currentUser = (members || []).find((m) => m.user_id === user?.id);
  const isAdmin = currentUser?.role === "admin";
  return (
    <div className="w-full px-4 md:px-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Group Details
        </h2>
        <AddEnrtyModal groupId={groupId} />
      </div>

      {/* MEMBERS */}
      <Card className="bg-white/5 border hover:shadow-lg border-white/10 backdrop-blur-xl rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-white font-medium mb-3">
            <Users size={16} />
            Members ({members.length})
          </div>
          <MemberList groupId={groupId} createdBy={user.id} />
        </CardContent>
      </Card>

      {/* ENTRIES */}
      <Card className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-white font-medium mb-3">
            <List size={16} />
            Entries
          </div>
          <EntryList groupId={groupId} isAdmin={isAdmin} />
        </CardContent>
      </Card>
    </div>
  );
}