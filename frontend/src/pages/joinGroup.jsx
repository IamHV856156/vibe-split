import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { joinGroups } from "@/features/groups/groupServices";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function JoinGroup(){
    const [code,setCode] = useState("");
    const [loading,setLoading] = useState(false);
    const {user} = useAuth();
    const navigate = useNavigate();

    const handleJoin = async () =>{
        if (!code.trim()) {
            return( alert("Enter invite code"));
        }
        setLoading(true);
        //find group
        const {error} = await joinGroups(code,user.id);
        setLoading(false);
        if (error) {
            alert(error.message);
        }else{
            alert("Joined successfully!");
            // after join member will we send to dashboard
            navigate("/dashboard");
        };
    };
    return(
        <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
            {/* background gradient */}
            <div className="absolute inset-0 bg-linear-to-b from zinc-900 via-black to bg-zinc-800"/>
            {/* glow blobs */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 blur-[120px] opacity-30 pointer-events-none"/>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500 blur-[120px] opacity-30 pointer-events-none"/>

            <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-6">
            <CardHeader className="text-center space-y-2">
                <User size={32} className="mx-auti text-white"/>
                <CardTitle className="text-2xl text-white">
                    Join a Group
                </CardTitle>
                <CardDescription className="text-gray-400">
                    Enter invite code to join your friends
                </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
                <Input placeholder="Enter invite code" value={code} onChange={(e)=> setCode(e.target.value)}  className="bg-white/20 border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500"/>
                <Button onClick={handleJoin} disable={loading} className="w-full h-12 rounded-xl bg-purpule-600 hover:bg-purple-700 text-white transition-all hover:scale-[1.02]">
                    {loading ? "joining..." : "Join Group"}
                </Button>
            </CardContent>
            </Card>
        </div>
    );
}