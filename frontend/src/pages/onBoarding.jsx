import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, PlusCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OnBoarding(){
    const navigate = useNavigate();

    return(
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* bg gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-black to-zinc-800 pointer-events-none"/>
                {/* glow blobs */}
                <div className="absolute -top-40 -left-40 w-100 h-100 bg-purple-500 rounded-full blur-[120px] opacity-30 pointer-events-none"/>
                <div className="absolute -bottom-40 -right-40 w-100 h-100 bg-blue-500 rounded-full blur-[120px] opacity-30 pointer-events-none"/>
        <Card className=" relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rbga(0,0,0,0.6)] border border-white/20 rounded-3xl">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold text-white">Welcome to VibeSplit</CardTitle>
                    <CardDescription className="text-gray-400">Split expenses with friends easily</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Create group */}
                    <Button onClick={()=> navigate("/groups")} className="w-full justify-start gap-3 h-14 rounded-xl bg-white/10 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-[1.03] duration-300">
                        <PlusCircle size={20}/>
                        <div className="text-left">
                            <p className="font-medium">Create Group</p>
                            <p className="text-xs text-gray-300">Start a new expense group</p>
                        </div>
                    </Button>
                    {/* join group */}
                    <Button className="w-full justify-start gap-3 h-14 text-white rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/20" onClick={()=> navigate("/join")}>
                        <User size={20}/>
                        <div className="text-left">
                            <p className="font-medium">Join Group</p>
                            <p className="text-xs text-gray-400">Enter invite code</p>
                        </div>
                    </Button>
                    {/* dashboard */}
                    <Button onClick={()=> navigate("/dashboard")} className="w-full justify-start gap-3 h-14 text-white rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/20">
                        <LayoutDashboard size={20}/>
                            <div className="text-left">
                                <p className="font-medium">Go to DashBoard</p>
                                <p className="text-xs text-gray-400">View your activity</p>
                            </div>
                    </Button>
                </CardContent>
            </Card>
    </div>       
    );
}