import { AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Crown, User } from "lucide-react";

const MemberCard = ({member, isAdmin}) =>{
    return(
        <div className="w-full">
            <div className="p-px rounded-2xl bg-linear-to-br from-violet-500/20 via-transparent to-blue-500/20">
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-2xl">
                    <CardContent className="flex items-center justify-between p-4">
                        {/* Left side Avatar with name */}
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border border-white/20">
                                <AvatarFallback className="bg-white/10 text-white font-semibold">
                                    {member.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            {/* name with role */}
                            <div>
                                <p className="font-medium text-white text-sm">{member.name}</p>
                            </div>
                        </div>
        
                        {/* right side role badge */}
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                            {isAdmin ? (
                                <Badge variant="default" className="bg-yellow-400/20 text-yellow-500 border border-yellow-400/30">
                                    <Crown size={12}/> Admin
                                </Badge>
                            ):(
                                <Badge variant="default" className="bg-blue-400/20 border border-blue-400/30">
                                    <User size={12}/> Member
                                </Badge>
                            )}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default MemberCard;