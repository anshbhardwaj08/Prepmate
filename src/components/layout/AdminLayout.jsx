import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-slate-950 min-h-screen">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="md:ml-60 min-h-screen flex flex-col">
        <AdminHeader onMenuOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-8 pt-20 md:pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;