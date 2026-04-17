import { useState } from "react";
import { createGroup } from "../groupServices";
import { useAuth } from "@/context/authContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

export default function CreateGroup({onGroupCreated}){
    const[name,setName]=useState("");
    const {user} = useAuth();
    const [loading,setLoading] = useState(false);
    const [open,setOpen] = useState(false);

    const handleCreate = async ()=>{
      if(!name) {
        return;
      }
      setLoading(true);

      const{error} = await createGroup(name,user.id);
      setLoading(false)
      if(error){
        alert(error.message);
      }else{
        setName("");
        setOpen(false);
        onGroupCreated?.();
      }
  };  

return(
  <Dialog open={open} onOpenChange={setOpen}>
    {/* button */}
    <DialogTrigger asChild>
    <Button className="rounded-xl gap-2 shadow-sm hover:scale-105 transition bg-white/80 text-black hover:bg-gray-200">
      <PlusCircle size={20}/> Create Group
    </Button>
    </DialogTrigger>

    <DialogContent className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-6">
      <DialogHeader className="space-y-2 text-center">
        <DialogTitle className="text-2xl font-bold text-white">Create New Groups</DialogTitle>
        <DialogDescription className="text-sm text-gray-400">Start splitting expenses with your friends</DialogDescription>
      </DialogHeader>

      <div className="space-y-4 mt-4">
        <Input placeholder="Enter group name..." value={name} onChange={(e)=>setName(e.target.value)}
        className="h-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-violet-500"/>
        <Button onClick={handleCreate} disabled={loading} 
        className="w-full h-12 rounded-xl bg-linear-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-semibold transition-all hover:scale-[1.02]">
          {loading ? "Creating..." : "Create Group "}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
};