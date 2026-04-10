import { useAuth } from "@/context/authContext";
import { useMembers } from "@/features/members/useMembers";
import EntryList from "@/features/entries/components/entryList";
import AddEnrtyModal from "@/features/entries/components/addEnrtyModal";
import MemberList from "../../members/components/MemberList";

const {user} =useAuth();
const{members} = useMembers(group.id);
const currentUser = members.find(m=>m.user_id === user.id);
const isAdmin = currentUser?.role === "admin";
const GroupCard =({group,user}) =>{

    return(
        <div>
            <h3>{group.name}</h3>
            <InviteButton code={group.invite_code} />
            <MemberList groupid={group.id}/>
            {/* <p>{isAdmin ? "Admin" : "Member"}</p> */}
            <AddEnrtyModal groupId={group.id}/>
            <EntryList groupId={group.id} isAdmin={isAdmin}/>
        </div>
    );
}

export default GroupCard;