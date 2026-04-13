import { useParams } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { useMembers } from "@/features/members/useMembers";
import EntryList from "@/features/entries/components/entryList";
import AddEnrtyModal from "@/features/entries/components/addEnrtyModal";
import MemberList from "@/features/members/components/MemberList";

export default function GroupDetails() {
  const { id } = useParams();
  const {user} = useAuth();
  const{member} = useMembers(id);

  const currentUser = member.fimd((m)=>m.user_id === user?.id);
  const isAdmin = currentUser?.role === "admin";
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Group Details</h2>
        <AddEnrtyModal groupId={id}/>
      </div>
      {/* Members */}
      <MemberList groupId={id}/>
      {/* entries */}
      <EntryList groupId={id} isAdmin={isAdmin}/>
    </div>
  );
}