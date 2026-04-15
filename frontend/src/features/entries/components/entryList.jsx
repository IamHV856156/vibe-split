import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { useEntries } from "../useEntries";
import EditEntryModal from "./editEntryModal";
import { Card, CardContent } from "@/components/ui/card";
import AddEnrtyModal from "./addEnrtyModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LockIcon } from "lucide-react";
const EntryList = ({groupId,isAdmin}) =>{
    const { entries, loading, deleteEntry, updateEntry } = useEntries(groupId);
    const [editingEntry, setEditingEntry] = useState(null);
    const {user} = useAuth();
  
    if (loading) {
        return (<p className="text-gray-400">Loading entries....</p>);
    }
    if (!loading && entries.length === 0) {
        return (<AddEnrtyModal groupId={groupId}/>);
    }
    return(            
        <div className="space-y-6">
            <div className="space-y-3">
            <EditEntryModal entry={editingEntry} onClose={() => setEditingEntry(null)} onSave={updateEntry}/>
            {entries.map((e)=>{
                const isOwned = e.user_id === user?.id;
                const isSaving = e.type === "saving";
                return(
                    <Card key={`entry-${e.id}-${e.user_id}`} className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl hover:shadow-lg transition">
                        <CardContent className="p-4 flex justify-between items-center">
                            {/* left */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <Badge className={e.type === "expense" ? "bg-red-500/20 text-red-400 text-sm hover:scale-[1.03] transition duration-300" : "bg-emerald-500/20 text-emerald-400"} >
                                    {e.type.toUpperCase()}
                                    </Badge>
                                    <span className="text-white font-medium">
                                        INR {e.amount}
                                    </span>
                                </div>
                                <p className="text-lg text-white/80 mt-1">{e.description}</p>
                            </div>
                            {/* right */}
                            <div className="flex gap-2">
                                <Button onClick={() => deleteEntry(e.id)} 
                                        className="px-3 py-1 text-sm bg-red-500/10 text-red-400 hover:bg-red-500/30 rounded-lg"> Delete
                                </Button>
                                {(isAdmin || (isOwned && !isSaving)) ? (
                                    <Button onClick={() => <EditEntryModal/>} 
                                            className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/30">Edit
                                    </Button>
                                ):(
                                <span className=" text-gray-400">
                                    <LockIcon size={20}/>
                                </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                
            );
        })}
            </div>
        </div>
    );
};
export default EntryList;