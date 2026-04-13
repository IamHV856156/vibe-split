import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, PlusCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OnBoarding(){
    const navigate = useNavigate();

    return(
        <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md shadow-xl border">
                <CardHeader className="text-center space-y2">
                    <CardTitle className="text-xl font-bold">Welcome to VibeSplit</CardTitle>
                    <CardDescription>Split expenses with friends easily</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Create group */}
                <Button onClick={()=> navigate("/groups")} className="w-full justify-start gap-3 h-14 text-left rounded">
                    <PlusCircle size={20}/>
                    <div>
                        <p className="font-medium">Create Group</p>
                        <p className="text-xs opacity-70">Start a new expense group</p>
                    </div>
                </Button>
                {/* join group */}
                <Button variant="outline" className="w-full justify-start gap-3 h-14 text-left rounded" onClick={()=> navigate("/join")}>
                    <User size={20}/>
                    <div>
                        <p className="font-medium">Join Group</p>
                        <p className="text-xs opacity-70">Enter invite code</p>
                    </div>
                </Button>
                {/* dashboard */}
                <Button variant="outline" onClick={()=> navigate("/dashboard")} className="w-full justify-start gap-3 h-14 text-left rounded">
                    <LayoutDashboard size={20}/>
                    <div><p className="font-medium">Go to DashBoard</p>
                    <p className="text-xs opacity-70">View your activity</p>
                    </div>
                </Button>
                </CardContent>
            </Card>
        </div>
    );
}