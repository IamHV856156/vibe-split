import { Home, Users, Plus, LogOut, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative top-0 left-0 z-50 h-full bg-white border-r flex flex-col justify-between p-4",
          "transition-all duration-300 ease-in-out",

          // width
          collapsed ? "w-16" : "w-64",

          // mobile slide
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* TOP */}
        <div>
          {/* Logo + Toggle */}
          <div className="flex items-center justify-between mb-8">
            {!collapsed && (
              <h1 className="text-xl font-bold tracking-tight">
                 Vibe Split
              </h1>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <PanelLeft size={18} />
            </button>
          </div>

          {/* Nav */}
          <nav className="space-y-2">
            <NavItem to="/dashboard" icon={<Home size={18} />} label="Dashboard" collapsed={collapsed} />
            <NavItem to="/groups" icon={<Users size={18} />} label="Groups" collapsed={collapsed} />
            <NavItem to="/join" icon={<Plus size={18} />} label="Join" collapsed={collapsed} />
          </nav>
        </div>

        {/* BOTTOM */}
        <button className="flex items-center gap-3 p-2 rounded-lg text-red-500 hover:bg-red-50 transition">
          <LogOut size={18} />
          {!collapsed && "Logout"}
        </button>
      </aside>
    </>
  );
};

const NavItem = ({to="/", icon, label, collapsed }) => {
  return (
     <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "group relative flex items-center gap-3 p-2 rounded-lg transition",
          isActive
            ? "bg-black text-white"
            : "hover:bg-gray-100 text-gray-700"
        )
      }
    >
      {icon}
      {!collapsed && <span className="text-sm">{label}</span>}
      {/* tooltip (when collapsed) */}
      {collapsed && (
        <span className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          {label}
        </span>
      )}
      </NavLink>
  );
};

export default Sidebar;