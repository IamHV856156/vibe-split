import { useState,useEffect } from "react";
import { signIn } from "../authServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

export default function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async()=>{
        const {data,error} = await signIn(email,password);
        console.log("LOGIN DATA:", data);
  console.log("LOGIN ERROR:", error);

        if(error){
            alert(error.message);
        }else{
            navigate("/dashboard");
        };
    };

    const { user } = useAuth();
    useEffect(() => {
      if (user) {
        navigate("/dashboard");
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