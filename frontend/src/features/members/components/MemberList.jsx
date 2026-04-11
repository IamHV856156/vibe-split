import { useMembers } from "@/features/members/useMembers";
import MemberCard from "@/features/members/components/memberCard";
const MemberList = ({groupId,createdBy}) =>{
    const {members} = useMembers(groupId);

    return(
        <div>
            <h4>Members</h4>
            {members.map((m)=>(
                <MemberCard key={m.id} member={m} isAdmin={m.user_id === createdBy}/>
        ))}
        </div>
    );
};

export default MemberList;