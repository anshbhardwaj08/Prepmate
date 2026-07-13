import { useState } from "react";
import { Outlet } from "react-router-dom";

import CandidateSidebar from "./CandidateSidebar";
import CandidateHeader from "./CandidateHeader";

const CandidateLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-slate-950 min-h-screen">
      <CandidateSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="md:ml-60 flex min-h-screen flex-col">
        <CandidateHeader onMenuOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CandidateLayout;