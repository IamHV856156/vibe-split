// import { useState } from "react";
// import { signIn } from "../authServices";
// import { useNavigate } from "react-router-dom";

// export default function Login(){
//     const[email, setEmail] = useState("");
//     const[password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async()=>{
//         const {data,error} = await signIn(email,password);
//         console.log("LOGIN DATA:", data);
//   console.log("LOGIN ERROR:", error);

//         if(error){
//             alert(error.message);
//             navigate("/dashboard");
//         };
//     };

//     return(
//         <div>
//             <h2>Login</h2>
//             {/* <input placeholder="Email" value={email} onChange={e =>setEmail(e.target.value)}/>
//             <input type="password" placeholder="Password" value={password} onChange={e =>setPassword(e.target.value)}/> */}
//             <input
//   type="email"
//   placeholder="Email"
//   value={email}
//   onChange={(e) => {
//     console.log("typing email:", e.target.value);
//     setEmail(e.target.value);
//   }}
// />

// <input
//   type="password"
//   placeholder="Password"
//   value={password}
//   onChange={(e) => {
//     console.log("typing password:", e.target.value);
//     setPassword(e.target.value);
//   }}
// />
//             <button onClick={handleLogin}>Login</button>
//         </div>
//     );
// }

import { useState } from "react";
import { signIn } from "../authServices";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("FINAL EMAIL:", email);
    console.log("FINAL PASSWORD:", password);

    if (!email || !password) {
      alert("Email or password missing");
      return;
    }

    const { data, error } = await signIn(email, password);

    console.log("LOGIN DATA:", data);
    console.log("LOGIN ERROR:", error);

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          console.log("typing email:", e.target.value);
          setEmail(e.target.value);
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          console.log("typing password:", e.target.value);
          setPassword(e.target.value);
        }}
      />

      <button onClick={handleLogin}>Login</button>
      <button onClick={async () => {
  const { data, error } = await signIn("test@gmail.com", "123456789");
  console.log("DIRECT LOGIN:", data, error);
}}>
  Test Direct Login
</button>

      {/* DEBUG UI */}
      <p>Email: {email}</p>
      <p>Password: {password}</p>
    </div>
  );
}