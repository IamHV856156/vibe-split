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
        <Card className="mb-4 shadow-md bg-red-300 grid grid-cols-1">
            <CardHeader className="bg-fuchsia-800 flex justify-between items-center">
                <CardTitle className="w-[50%]">
                    <h1 className="bg-emerald-300 text-5xl font-extrabold ">{group.name}</h1>
                </CardTitle>
                <InviteButton code={group.invite_code} className="w-[50%]" />
            </CardHeader>
            <CardContent className="space-y-4">
            {/* //inviteButton */}
            {/* //Member */}
            <MemberList groupId={group.id}/>
            {/* //Add Entry */}
            <AddEnrtyModal groupId={group.id}/>
            {/* //Entries */}
            <EntryList groupId={group.id} isAdmin={isAdmin}/>
            </CardContent>
        </Card>
    );
}

export default GroupCard;