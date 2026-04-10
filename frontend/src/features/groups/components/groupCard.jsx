import { useAuth } from "@/context/authContext";
import { useMembers } from "@/features/members/useMembers";
import EntryList from "@/features/entries/components/entryList";
import AddEnrtyModal from "@/features/entries/components/addEnrtyModal";
import MemberList from "./memberList";

const {user} =useAuth();
const{members} = useMembers(group.id);
const currentUser = members.find(m=>m.user_id === user.id);
const GroupCard =({group,user}) =>{
    const isAdmin = currentUser?.role === "admin";

    return(
        <div>
            <h3>{group.name}</h3>
            <MemberList group={group}/>
            <p>{isAdmin ? "Admin" : "Member"}</p>
            <AddEnrtyModal groupId={group.id}/>
            <EntryList groupId={group.id} isAdmin={isAdmin}/>
            <p>Invite Code: {group.invite_code}</p>
        </div>
    );
}

export default GroupCard;