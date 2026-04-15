import { useEffect, useState } from "react";
import { updateEntry } from "../entryService";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil} from "lucide-react";

const EditEntryModal = ({entry,onClose}) => {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  
  // users previous data will we shown
  useEffect(() => {
    if (entry) {
      setAmount(entry.amount);
      setDesc(entry.description);
    }
  }, [entry]);

  const handleSave = async () => {
    // check whether any field was remained empty or not
    if (!amount || !desc) {
      return alert("Please fill all fields");
    }
    setLoading(true);

    //calls update entry function from entryServices
    const { error } = await updateEntry(entry.id, {
      amount: Number(amount),
      description: desc,
    });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Entry updated");
      setClose();
    }
  };
  if (!entry){ 
    return (null);
  }

  return (
    <Dialog open={!!entry} onOpenChange={onClose}>
      <DialogContent className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Pencil size={18} /> Edit Entry
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Update your expense
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Amount */}
          <Input placeholder="Enter Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"/>
          {/* Description */}
          <Input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"/>

          {/* Save change btn */}
            <Button onClick={handleSave} disabled={loading}
              className="flex-1 bg-purple-600 hover:bg-purple-700 rounded-xl">
              {loading ? "Saving..." : "Save Changes"}
            </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditEntryModal;