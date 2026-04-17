import { useMembers } from "@/features/members/useMembers";
import MemberCard from "@/features/members/components/memberCard";
import { Card, CardContent } from "@/components/ui/card";
import EmptyState from "@/components/ui/custom/EmptyState";
import InviteButton from "@/features/groups/components/inviteButton";
const MemberList = ({groupId,createdBy}) =>{
    const {members=[],loading} = useMembers(groupId);
    // removes duplicates of members
    const uniqueMember = Array.from(new Map(members.map((m)=>[m.id,m])).values());
    if (loading) {
        return(<p className="text-gray-400 text-sm">Loading members...</p>);
    }
    return(
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl">
            <CardContent className="p-4 space-y-6">
            {/* check empty */}
            {uniqueMember.length === 0 ? (
                <EmptyState title="No members yet"
                        description="Invite friends to join the group"
                        actionLabel="Invite"
                        onAction={()=>{(<InviteButton />)}}/>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {uniqueMember.map((m,index)=>(
                    <MemberCard key={`${m.id}-${index}`} member={m} isAdmin={m.user_id === createdBy}/>
                ))}
            </div>
            )}
            </CardContent>
        </Card>
    );
};

export default MemberList;