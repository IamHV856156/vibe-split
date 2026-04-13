import { useState } from "react";
import { createGroup } from "../groupServices";
import { useAuth } from "@/context/authContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <Button>Create Group</Button>
    </DialogTrigger>

    <DialogContent className="rounded-2xl">
      <DialogHeader>
        <DialogTitle>Create New Groups</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 mt-4">
        <Input placeholder="Enter Group Name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <Button onClick={handleCreate} disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Group "}
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
};