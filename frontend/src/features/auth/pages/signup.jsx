import { useState } from "react";
import { signUp } from "../authServices";
import { supabase } from "@/services/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail,MailOpen,Eye,EyeOff, User2, UserPlus } from "lucide-react";

export default function Signup(){
    const[name,setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[showEmail, setShowEmail] = useState(false);
    const[showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async()=>{
        if (!name) {
            return alert("Name is required");
        }
        try {
         const {data,error} = await signUp(email,password,name);
        if(error){
            alert(error.message);
        }else{
            alert("Please Check Your Email");
        }
        const user = data?.user;
        if (user) {   
            await supabase.from("profiles").insert([
                {
                    id:user.id,
                    name:name,
                },
            ]);
        }  
        navigate("/login");
      } catch (error) {
        console.error("Signup error:",error);
        alert("Something went wrong");
      }
    };

    return(
        <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
          {/* background gradient */}
            <div className="absolute inset-0 bg-linear-to-b from-zinc-900 via-black to bg-zinc-800"/>
            {/* glow blobs */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 blur-[120px] opacity-30 pointer-events-none"/>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500 blur-[120px] opacity-30 pointer-events-none"/>
            {/* Signup Card */}
            <Card className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-6">
            <CardHeader className="text-center space-y-2">
                  <div className="flex justify-center">
                    <div className="p-3 rounded-full bg-white/10 border hover:bg-white/20 hover:scale-[1.03] border-white/20">
                      <UserPlus size={28} className="text-white"/>
                    </div>
                  </div>
                <CardTitle className="text-2xl text-white">
                    Create Account
                </CardTitle>
                <CardDescription className="text-gray-400">
                    Join VibeSplit and start managing expenses
                </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
                {/* name input */}
              <div className="relative" >
                <Input placeholder="Enter your Name" value={name} type="text" onChange={e =>setName(e.target.value)}  className="w-full pr-10 bg-white/20 border border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 rounded-xl h-12 px-3"/>
                <Button type="button" className="absolute right-3 top-2 bg-transparent text-gray-400 hover:text-white">
                    <User2 size={18}/>
                </Button>
              </div>
              {/* email input */}
              <div className="relative" >
                <Input placeholder="Enter your Email" value={email}  type={"email"} onChange={e =>setEmail(e.target.value)}  className="w-full pr-10 bg-white/20 border border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 rounded-xl h-12 px-3"/>
                <Button type="button" onClick={()=> setShowEmail(!showEmail)} className="absolute right-3 top-2 bg-transparent text-gray-400 hover:text-white">
                  {showEmail ? <Mail size={18}/> : <MailOpen size={18}/>}
                </Button>
              </div>
              {/* password input */}
              <div className="relative">
                <Input placeholder="Enter your Password" key={showPass?"text":"password"} type={showPass?"text":"password"} value={password} onChange={(e)=> setPassword(e.target.value)}  className="w-full pr-10 bg-white/20 border border-white/20 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 rounded-xl h-12 px-3"/>
                <Button type="button" onClick={()=> setShowPass(!showPass)} className="absolute right-3 top-2 bg-transparent text-gray-400 hover:text-white">
                  {showPass ? <EyeOff size={18}/> : <Eye size={18}/> }
                </Button>
              </div>
              {/* singup button */}
                <Button onClick={handleSignup} className="w-full h-12 z-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all hover:scale-[1.02]">
                  SignUp Now
                </Button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-gray-500">Or</span>
                </div>
              </div>
              {/* login navigation */}
              <div className="text-center space-y-3">
                <p className="text-gray-400 text-sm">Already have an account?</p>
                <Button variant="outline" onClick={() => navigate("/login")}
                        className="w-full h-12 rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white transition-all">
                  Login to <span className="italic">VibeSplit</span></Button>
              </div>
            </CardContent>
            </Card>
        </div>
    );
}