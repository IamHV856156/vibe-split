import { useAuth } from "@/context/authContext";

export default function Dashboard(){
    const {user} =useAuth();

    return(
        <div>
            <h2>DashBoard</h2>
            <p>Welcome {user?.email}</p>
        </div>
    );
}