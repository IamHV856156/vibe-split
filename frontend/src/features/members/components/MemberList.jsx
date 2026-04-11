import { useMembers } from "@/features/members/useMembers";
import MemberCard from "@/features/members/components/memberCard";
const MemberList = ({groupId,createdBy}) =>{
    const {members} = useMembers(groupId);
    const uniqueMember = Array.from(new Map(members.map((m)=>[m.id,m])).values());
    return(
        <div className="bg-white rounded-2xl shadow p-4 space-y-4">
            <h3 className="text-lg font-semibold">Members</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {uniqueMember.map((m,index)=>(
                <MemberCard key={`${m.id}-${index}`} member={m} isAdmin={m.user_id === createdBy}/>
                ))}
            </div>
        </div>
    );
};

export default MemberList;