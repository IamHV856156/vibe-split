'use client';
import React, { useState } from 'react';

interface Users {
  name: string;
  paid: number;
}

export default function InputForm({ onCalculate }: { onCalculate: (p: Users[]) => void }) {
  const [folks, setfolks] = useState<Users[]>([
    { name: '', paid: 0 },
    { name: '', paid: 0 }
  ]);

  const addPerson = () => setfolks([...folks, { name: '', paid: 0 }]);

  const updatePerson = (index: number, field: keyof Users, value: string | number) => {
    const newbuddy = [...folks];
    newbuddy[index] = { ...newbuddy[index], [field]: value };
    setfolks(newbuddy);
  };

  return (
    <div className="p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
      <h2 className="text-xl font-bold mb-6 text-purple-300 tracking-tight">Kiske kitne hue? 💸</h2>
      
      <div className="space-y-4">
        {folks.map((p, index) => (
          <div key={index} className="flex gap-3 animate-in fade-in slide-in-from-left-4 duration-300">
            <input
              type="text"
              placeholder="Name (e.g. Rahul)"
              className="bg-white/5 border border-white/10 p-3 rounded-xl flex-1 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
              value={p.name}
              onChange={(e) => updatePerson(index, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="₹ 0"
              className="bg-white/5 border border-white/10 p-3 rounded-xl w-28 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
              value={p.paid || ''}
              onChange={(e) => updatePerson(index, 'paid', parseFloat(e.target.value) || 0)}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-8">
        <button 
          onClick={addPerson}
          className="w-full py-3 rounded-xl border border-dashed border-white/20 hover:border-purple-400/50 hover:bg-white/5 transition-all text-sm text-zinc-400"
        >
          + Add another dost
        </button>
        <button 
          onClick={() => onCalculate(folks.filter(u => u.name.trim() !== ""))}
          className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all font-bold text-white shadow-lg shadow-purple-500/25"
        >
          Settle the Vibe
        </button>
      </div>
    </div>
  );
}