import { Button } from "@/components/ui/button";
import { Card,CardContent, CardHeader } from "@/components/ui/card";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
export default function InviteButton({ code }) {
  const [copied,setcopied] = useState(false);
  const copyCode = async() => {
    navigator.clipboard.writeText(code);
    setcopied(true);

    setTimeout(()=> setcopied(false),3000);
  };

  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl backdrop-blur-md">
      <span className="text-lg font-mono text-white tracking-tight">
        {code}
      </span>
        <Button size="icon" variant="ghost" onClick={copyCode} className="text-gray-400  hover:text-white" >
          {copied ? (
            <Check size={16} className="text-emerald-500" />
          ) : (
            <Copy size={16}/>
          )}
        </Button>
    </div>
  );
}