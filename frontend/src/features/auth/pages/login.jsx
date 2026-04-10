import { useState,useEffect } from "react";
import { signIn } from "../authServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

export default function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
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
        <div>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => { 
              setEmail(e.target.value);
              }
            }
          />
          <input type="password" placeholder="Password" value={password} onChange={(e) => { 
            setPassword(e.target.value);
            }}
          />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}