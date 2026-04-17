import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";
import { deleteEntry } from "../entryService";

const DeleteEntryModal = ({ entry, onClose }) => {
  if (!entry) return null;

  const handleDelete = async () => {
    await deleteEntry(entry.id);
    onClose();
  };

  return (
    <Dialog open={!!entry} onOpenChange={onClose}>
      <DialogContent className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl text-white">

        {/* Header */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle size={18} />
            Delete Entry
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="space-y-4 mt-4">

          <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-3 text-sm text-red-300">
            Are you sure you want to delete this entry?
            <br />
            <span className="text-white font-medium">
              INR {entry.amount} — {entry.description}
            </span>
          </div>

          {/* delete btn*/}
          <div className="flex gap-3">
            <Button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700">
              <Trash2 size={14} className="mr-1" /> Delete
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEntryModal;