import { useAuth } from "@/context/authContext";
import { useMembers } from "@/features/members/useMembers";
import EntryList from "@/features/entries/components/entryList";
import AddEnrtyModal from "@/features/entries/components/addEnrtyModal";
import MemberList from "../../members/components/MemberList";
import InviteButton from "./inviteButton";
import { Card,CardContent,CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Crown, Hash, Users } from "lucide-react";

export default function GroupCard ({group}){
    const {user} =useAuth();
    const{members} = useMembers(group.id);
    const currentUser = members.find((m)=>m.user_id === user?.id);
    const isAdmin = currentUser?.role === "admin";
    const adminUser = members.find((m)=>m.role === "admin");
    return(
              <div className="w-full mb-6">

      {/* Gradient Border */}
      <div className="w-full p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20">

        <Card className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">

          {/* HEADER */}
          <CardHeader className="space-y-3">

            {/* Title + Invite */}
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-white">
                {group.name}
              </CardTitle>

              <InviteButton code={group.invite_code} />
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">

              <div className="flex items-center gap-1">
                <Hash size={14} />
                {group.invite_code}
              </div>

              <div className="flex items-center gap-1">
                <Crown size={14} className="text-yellow-400" />
                {adminUser?.name || "Admin"}
              </div>

            </div>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* MEMBERS */}
            <Card className="bg-white/5 border border-white/10 rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-white font-medium mb-3">
                  <Users size={16} />
                  Members ({members.length})
                </div>

                <MemberList groupId={group.id} />
              </CardContent>
            </Card>

            {/* ADD ENTRY */}
            <div className="flex justify-end">
              <AddEnrtyModal groupId={group.id} />
            </div>

            {/* ENTRIES */}
            <Card className="bg-white/5 border border-white/10 rounded-2xl">
              <CardContent className="p-4">
                <EntryList groupId={group.id} isAdmin={isAdmin} />
              </CardContent>
            </Card>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
//         <Card className="mb-4 shadow-md bg-red-300 grid grid-cols-1">
//             <CardHeader className="bg-fuchsia-800 flex justify-between items-center">
//                 <CardTitle className="w-[50%]">
//                     <h1 className="bg-emerald-300 text-5xl font-extrabold ">{group.name}</h1>
//                 </CardTitle>
//                 <InviteButton code={group.invite_code} className="w-[50%]" />
//             </CardHeader>
//             <CardContent className="space-y-4">
//             {/* //inviteButton */}
//             {/* //Member */}
//             <MemberList groupId={group.id}/>
//             {/* //Add Entry */}
//             <AddEnrtyModal groupId={group.id}/>
//             {/* //Entries */}
//             <EntryList groupId={group.id} isAdmin={isAdmin}/>
//             </CardContent>
//         </Card>
//     );
// }