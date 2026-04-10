import { useAuth } from "@/context/authContext";
import { logOut } from "@/features/auth/authService";

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h3>SplitSave</h3>
      <div>
        <span>{user?.email}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}