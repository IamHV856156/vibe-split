import { useNavigate } from "react-router-dom";
import { Card,CardContent } from "@/components/ui/card";

export default function GroupCardSmall({group}){
    const navigate = useNavigate();
    return(
        <Card onClick={()=> navigate(`/groups/${group.id}`)} className="cursor-pointer hover:shadow-md transition rounded-2xl">
            <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold">{group.name}</h3>
                <p className="text-sm text-gray-500">Invite:{group.invite_code}</p>
            </CardContent>
        </Card>
    );
} 