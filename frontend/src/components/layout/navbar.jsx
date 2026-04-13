import { Menu } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { Avatar,AvatarFallback,AvatarImage } from "../ui/avatar";

const Navbar = ({ setMobileOpen }) => {
  const { user } = useAuth();

  return (
    <header className="h-14 border-b border-white/20 flex items-center justify-between px-4 md:px-6">

      {/* Mobile menu */}
      <button
        className="md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={22} />
      </button>

      <h2 className="font-semibold text-lg hidden md:block">
        Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-white">
          {user?.email}
        </span>

        <Avatar className="w-8 h-8">
          <AvatarImage src={user.image || ""} alt={user.name}/>
            <AvatarFallback className="rounded-full bg-linear-to-br from-violet-500 via-black to-fuchsia-500 text-white flex items-center justify-center font-semibold">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Navbar;