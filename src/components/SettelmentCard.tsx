'use client';
import React from 'react';
import { Transaction } from '@/lib/settelment';

export default function SettlementCard({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) return null;

  return (
    <div className="mt-8 p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in-95 duration-500">
      <h2 className="text-xl font-bold mb-6 text-green-400 tracking-tight">Final Settlement 🤝</h2>
      
      <div className="space-y-4">
        {transactions.map((t, index) => (
          <div key={index} className="flex flex-col p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400 text-sm font-medium">
                <span className="text-white font-bold">{t.from}</span> pays <span className="text-white font-bold">{t.to}</span>
              </span>
              <span className="text-xl font-black text-green-400">₹{t.amount}</span>
            </div>
            <button className="mt-3 text-xs text-purple-400 hover:text-purple-300 text-left transition-all">
              + Generate WhatsApp Vibe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}