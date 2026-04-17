import { useParams } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { useMembers } from "@/features/members/useMembers";
import EntryList from "@/features/entries/components/entryList";
import AddEnrtyModal from "@/features/entries/components/addEnrtyModal";
import MemberList from "@/features/members/components/MemberList";
import { Currency, List, Users } from "lucide-react";
import { Card,CardContent,CardTitle } from "@/components/ui/card";
import { getGroupById, getGroups } from "../groupServices";
import { useEffect, useState } from "react";
import InviteButton from "../components/inviteButton";
import Summary from "@/features/savings/components/summary";

export default function GroupDetails() {
  const {groupId} = useParams();
  const {user} = useAuth();
  const { members } = useMembers(groupId);
  const uniqueMember = Array.from(new Map(members.map((m)=>[m.id,m])).values());
  const [groups,setGroups] = useState(null);
  
  useEffect(()=>{
    const groupName = async () =>{
      const{data , error } = await getGroupById(groupId);
      if(!error){
        setGroups(data);
        console.log("groupName:",error);
      }
    };
    if(groupId){
      groupName();
    }
  },[groupId]);
  const currentUser = (members || []).find((m) => m.user_id === user?.id);
  const isAdmin = groups?.created_by === user?.id;
  return (
    <div className="w-full px-4 md:px-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Group Details
        </h2>
        <AddEnrtyModal groupId={groupId} />
      </div>
      <Card className="bg-white/5 border hover:shadow-lg border-white/10 backdrop-blur-xl rounded-2xl">
        <CardContent className="p-4">
          <div className="flex justify-between items-center text-white font-medium mb-3">
            <CardTitle className=" text-2xl font-serif font-bold text-white/90">
                {groups?.name.toUpperCase()}
              </CardTitle>
              {/* INVITE BUTTON */}
              <InviteButton code={groups?.invite_code} />
          </div>
        </CardContent>
      </Card>

      {/* MEMBERS */}
      <Card className="bg-white/5 border hover:shadow-lg border-white/10 backdrop-blur-xl rounded-2xl">
        <CardContent className="p-4 ">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-white font-semibold mb-3">
              <Users size={20} />
              Members 
            </div>
            <span className="text-sm text-white/80 ">
              {uniqueMember.length}
            </span>
          </div>
          <MemberList groupId={groupId} createdBy={groups?.created_by} />
        </CardContent>
      </Card>
      {/* Summary and settelmet */}
      <Card className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-white font-medium mb-3">
            <Currency size={20}/>
            OverView
          </div>
          <Summary groupId={groupId} />
        </CardContent>
      </Card>
      {/* ENTRIES */}
      <Card className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-white font-medium mb-3">
            <List size={16} />
            Entries
          </div>
          <EntryList groupId={groupId} isAdmin={isAdmin} />
        </CardContent>
      </Card>
    </div>
  );
}