import { useAuth } from "@/context/authContext";
import { useMembers } from "@/features/members/useMembers";
import EntryList from "@/features/entries/components/entryList";
import AddEnrtyModal from "@/features/entries/components/addEnrtyModal";
import MemberList from "../../members/components/MemberList";
import InviteButton from "./inviteButton";
import { Card,CardContent,CardHeader, CardTitle } from "@/components/ui/card";

const GroupCard =({group}) =>{
    const {user} =useAuth();
    const{members} = useMembers(group.id);
    const currentUser = members.find((m)=>m.user_id === user?.id);
    const isAdmin = currentUser?.role === "admin";
    return(
        <Card className="mb-4 shadow-md">
            <CardHeader>
                <CardTitle><h3>{group.name}</h3></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            //inviteButton
            <InviteButton code={group.invite_code} />
            //Member
            <MemberList groupId={group.id}/>
            //Add Entry
            <AddEnrtyModal groupId={group.id}/>
            //Entries
            <EntryList groupId={group.id} isAdmin={isAdmin}/>
            </CardContent>
        </Card>
    );
}

export default GroupCard;