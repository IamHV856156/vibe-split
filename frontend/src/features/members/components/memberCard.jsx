import { AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

const MemberCard = ({member, isAdmin}) =>{
    return(
        <Card className="hover:shadow-lg transition-all duration-200 rounded-2xl">
            <CardContent className="flex items-center justify-between p-4">
                {/* Left side Avatar with name */}
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>
                            {member.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-gray-500">Member</p>
                    </div>
                </div>

                {/* right side role badge */}
            {isAdmin && (
                <Badge variant="default" className="bg-black text-white">
                    Admin
                </Badge>
            )}
            </CardContent>
        </Card>
    );
};

export default MemberCard;