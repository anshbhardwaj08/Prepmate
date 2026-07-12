import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {

    return (

        <div className="bg-slate-950">

            <AdminSidebar />

            <div className="ml-64 min-h-screen">

                <AdminHeader />

                <main className="p-8 pt-32">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default AdminLayout;