import { useState, useEffect } from "react";

const EditEntryModal = ({ entry, onClose, onSave }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (entry) {
      setAmount(entry.amount);
      setType(entry.type);
      setDesc(entry.description);
    }
  }, [entry]);

  const handleSave = () => {
    onSave(entry.id, {
      amount: Number(amount),
      type,
      description: desc,
    });
    onClose();
  };

  if (!entry) return null;

  return (
    <div style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}>
      <h3>Edit Entry</h3>

      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="saving">Saving</option>
      </select>

      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditEntryModal;