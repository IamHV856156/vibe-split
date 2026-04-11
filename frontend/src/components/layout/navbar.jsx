import { Menu } from "lucide-react";
import { useAuth } from "@/context/authContext";

const Navbar = ({ setMobileOpen }) => {
  const { user } = useAuth();

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-4 md:px-6">

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
        <span className="hidden sm:block text-sm text-gray-600">
          {user?.email}
        </span>

        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Navbar;