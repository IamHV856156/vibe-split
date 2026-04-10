import { useNavigate } from "react-router-dom";

export default function OnBoarding(){
    const navigate = useNavigate();

    return(
        <div>
            <h2>Welcome</h2>
            <p>what do you want to do</p>
            <button onClick={()=> navigate("/join")}>Join Group</button>
            <button onClick={()=> navigate("/create")}>Create Group</button>
            <button onClick={()=> navigate("/dashboard")}>Go to DashBoard</button>
        </div>
    );
}