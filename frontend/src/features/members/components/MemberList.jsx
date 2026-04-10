import { useMembers } from "@/features/members/useMembers";
import MemberCard from "@/features/members/components/memberCard";
const MemberList = ({group}) =>{
    const {members} = useMembers(group.id);

    return(
        <div>
            <h4>Members</h4>
            {members.map((m)=>(<MemberCard key={m.id} member={m} isAdmin={m.id === group.created_by}/>
        ))}
        </div>
    );
};

export default MemberList;