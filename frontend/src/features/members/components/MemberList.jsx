import { useMembers } from "@/features/members/useMembers";
import MemberCard from "@/features/members/components/memberCard";
const MemberList = ({groupId,createdBy}) =>{
    const {members} = useMembers(groupId);
    const uniqueMember = Array.from(new Map(members.map((m)=>[m.id,m])).values());
    return(
        <div className="bg-white rounded-2xl shadow p-4">
            <h4 className="text-lg font-semibold mb-2">Members</h4>
            {uniqueMember.map((m,index)=>(
                <MemberCard key={`${m.id}-${index}`} member={m} isAdmin={m.user_id === createdBy}/>
        ))}
        </div>
    );
};

export default MemberList;