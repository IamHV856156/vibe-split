import { Badge } from "@/components/ui/badge";
import { Card,CardContent,CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/authContext";
import { useMembers } from "@/features/members/useMembers";
import { Crown, Hash, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GroupCard ({group}){
    const navigate = useNavigate();
    const { user } = useAuth();
    const { members =[] } = useMembers(group.id);
    const currentUser = members.find((m)=>m.user_id === user?.id);
    const isAdmin = currentUser?.role === "admin";
    return(
    <div onClick={() => navigate(`/group/${group.id}`)} className="w-full mb-6 cursor-pointer">
      {/* Gradient Border */}
      <div className="w-full p-px rounded-3xl bg-linear-to-br from-purple-500/20 via-transparent to-blue-500/20">
        <Card className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
          {/* HEADER */}
          <CardHeader className="space-y-3">
            {/* Title */}
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-white">
                {group.name}
              </CardTitle>
            </div>
            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Hash size={14} />
                {group.invite_code}
              </div>
              {isAdmin ? (
                <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-400/30 flex items-center gap-1">
                    <Crown size={12}/>
                    Admin
                </Badge>
              ):(
                <Badge className="bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center gap-1">
                    <User size={12}/>
                    Member
                </Badge>
              )}
            </div>
          </CardHeader>

          {/* CONTENT */}
          <CardContent className="text-xs text-gray-400">
            Click to open group →
          </CardContent>

        </Card>
      </div>
    </div>
  );
}