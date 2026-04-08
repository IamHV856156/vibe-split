import { useState } from "react";
import { signUp } from "../authServices";

export default function Signup(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleSignup = async()=>{
        const {error} = await signUp(email,password);
        if(error){
            alert(error.message);
        }else{
            alert("Please Check Your Email");
        }
    };

    return(
        <div>
            <h2>SignUp</h2>
            <input placeholder="Email" onChange={e =>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={e =>setPassword(e.target.value)}/>
            <button onClick={handleSignup}>SignUp</button>
        </div>
    );
}