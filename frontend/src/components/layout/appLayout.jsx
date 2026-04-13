import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative text-white">
        {/* bg-gradient */}
        <div className="fixed inset-0 -z-10">
          <div className="w-full h-full bg-black"/>
          {/* glowblobs */}
          <div className=" absolute -top-25 -left-25 w-100 h-100 bg-purple-600/30 blur-[120px]"/>
          <div className="absolute -bottom-25 -right-25 w-100 h-100 bg-blue-600/30 blur-[120px]"/>
          </div>
      {/* sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
      {/* main */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* navbar */}
        <Navbar setMobileOpen={setMobileOpen} />
        {/* content */}
        <main className="flex-1 overflow-y-auto text-white bg-transparent p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
          <Outlet/>
          </div>
        </main>
        </div>
      </div>
  );
};

export default AppLayout;