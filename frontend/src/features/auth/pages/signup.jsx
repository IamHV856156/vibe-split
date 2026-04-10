import { useState } from "react";
import { signUp } from "../authServices";
import { supabase } from "@/services/supabaseClient";

export default function Signup(){
    const[name,setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleSignup = async()=>{
        if (!name) {
            return alert("Name is required");
        }
        const {data,error} = await signUp(email,password,name);
        if(error){
            alert(error.message);
        }else{
            alert("Please Check Your Email");
        }
        // const user = data.user;

        // await supabase.from("profiles").insert([
        //     {
        //         id:user.id,
        //         name:name,
        //     },
        // ]),
        alert("Signup Success");
    };

    return(
        <div>
            <h2>SignUp</h2>
            <input placeholder="Name" value={name} onChange={e =>setName(e.target.value)}/>
            <input placeholder="Email" value={email} onChange={e =>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={e =>setPassword(e.target.value)}/>
            <button onClick={handleSignup}>SignUp</button>
        </div>
    );
}