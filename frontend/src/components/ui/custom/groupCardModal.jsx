import { useNavigate } from "react-router-dom";
import { Card,CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../badge";
import { Avatar,AvatarFallback, AvatarImage } from "../avatar";

export default function GroupCardSmall({group}){
    const navigate = useNavigate();
    return(
        <Card onClick={()=> navigate(`/groups/${group.id}`)} className="cursor-pointer bg-white/5 border-white/10 backdrop-blur-xl rounded-2xl hover:scale-[1.02] hover:shadow-xl transition">
            <CardHeader className="flex flex-row items-center gap-3">
                {/* avatar */}
                <Avatar className="w-10 h-10">
                    <AvatarImage src={group.image || ""} alt={group.name}/>
                    <AvatarFallback className="rounded-full bg-linear-to-b from-purple-500 to-blue-500 text-white flex items-center justify-center font-semibold">
                    {group.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                {/* invite */}
                <div className="flex-1">
                    <CardTitle className="text-white group-hover:text-primary transition">
                        {group.name.toUpperCase()}
                    </CardTitle>
                    <CardDescription>
                        Invite:{group.invite_code}
                    </CardDescription>
                </div>
                <Badge variant="secondary">
                    {group.members_count || 1}
                </Badge>
            {/* <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold">{group.name}</h3>
                <p className="text-sm text-gray-500">Invite:{group.invite_code}</p>
            </CardContent> */}
            </CardHeader>
            <CardContent>
                <p className="text-xs text-muted-foreground">Tap to open group</p>
            </CardContent>
        </Card>
    );
} 