import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
      <div className="flex-1 flex flex-col w-full">
        <Navbar setMobileOpen={setMobileOpen} />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
          <Outlet/>
        </main>

      </div>
    </div>
  );
};

export default AppLayout;