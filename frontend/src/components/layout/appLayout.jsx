import { useState } from "react";
import Sidebar from "@/components/layout/sideBar";
import Navbar from "@/components/layout/navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative text-white">
        {/* bg-gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-zinc-900 via-black to bg-zinc-800"/>
            {/* glow blobs */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 blur-[120px] opacity-30 pointer-events-none"/>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500 blur-[120px] opacity-30 pointer-events-none"/>
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