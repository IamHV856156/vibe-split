import { useState } from "react";
import { signIn } from "../authServices";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async()=>{
        const {error} = await signIn(email,password);
        if(error){
            alert(error.message);
            navigate("/dashboard");
        };
    };

    return(
        <div>
            <h2>Login</h2>
            <input placeholder="Email" onChange={e =>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={e =>setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}