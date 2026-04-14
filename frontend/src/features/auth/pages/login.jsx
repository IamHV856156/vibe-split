import { useState,useEffect } from "react";
import { signIn } from "../authServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { Card,CardTitle,CardContent,CardHeader,CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, KeyRound, LockIcon, LockOpen, LogIn, Mail, MailOpen,} from "lucide-react";

export default function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[showPass,setShowPass] = useState(false);
    const[showEmail,setShowEmail] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async()=>{
      const {error} = await signIn(email,password);
      if(error){
        alert(error.message);
      }else{
        navigate("/onboarding");
      };
    };
    
    const { user } = useAuth();
    useEffect(() => {
      if (user) {
        navigate("/onboarding");
      }
    }, [user]);

    return(
        <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
          {/* background gradient */}
            <div className="absolute inset-0 bg-linear-to-b from-zinc-900 via-black to bg-zinc-800"/>
            {/* glow blobs */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 blur-[120px] opacity-30 pointer-events-none"/>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500 blur-[120px] opacity-30 pointer-events-none"/>
            {/* login Card */}
            <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-6">
            <CardHeader className="text-center space-y-2">
                  <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-white/10 border hover:bg-white/20 hover:scale-[1.03] border-white/20">
                      <KeyRound size={28} className="text-white"/>
                    </div>
                  </div>
                <CardTitle className="text-2xl text-white">
                    Welcome Back
                </CardTitle>
                <CardDescription className="text-gray-400">
                    Login to Continue VibeSplit
                </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="relative" >
                <Input placeholder="Enter your Email" type="text" value={email} onChange={(e)=> setEmail(e.target.value)}  className="w-full pr-10 bg-white/20 border border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 rounded-xl h-12 px-3"/>
                <Button type="button" onClick={()=> setShowEmail(!showEmail)} className="absolute right-3 top-2 bg-transparent text-gray-400 hover:text-white">
                  {showEmail ? <Mail size={18}/> : <MailOpen size={18}/>}
                </Button>
              </div>
              <div className="relative">
                <Input placeholder="Enter your Password" key={showPass?"text":"password"} type={showPass?"text":"password"} value={password} onChange={(e)=> setPassword(e.target.value)}  className="w-full pr-10 bg-white/20 border border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 rounded-xl h-12 px-3"/>
                <Button type="button" onClick={()=> setShowPass(!showPass)} className="absolute right-3 top-2 bg-transparent text-gray-400 hover:text-white">
                  {showPass ? <EyeOff size={18}/> : <Eye size={18}/> }
                </Button>
              </div>
                <Button onClick={handleLogin} className="w-full h-12 z-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all hover:scale-[1.02]">
                  Login
                </Button>
            </CardContent>
            </Card>
        </div>
    );
}