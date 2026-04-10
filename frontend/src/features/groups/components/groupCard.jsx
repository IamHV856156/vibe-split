import EntryList from "@/features/entries/components/entryList";
import AddEnrtyModal from "@/features/entries/components/addEnrtyModal";
import MemberList from "./memberList";

const GroupCard =({group,user}) =>{
    const isAdmin = user.id === group.created_by;

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