import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import authService from "../../appwrite/auth";
import { logout } from "../../features/auth/authSlice";

const AdminSidebar = () => {

    const dispatch = useDispatch();

    const handleLogout = async () => {

        await authService.logout();

        dispatch(logout());

    };

    const navClass = ({ isActive }) =>
        `block rounded-lg px-4 py-3 transition ${
            isActive
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
        }`;

    return (

        <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-800 bg-slate-900">

            <div className="border-b border-slate-800 p-6">

                <h1 className="text-3xl font-bold text-white">

                    PrepMate Admin

                </h1>

            </div>

            <nav className="space-y-2 p-5">

                <NavLink
                    end
                    to="/admin"
                    className={navClass}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/categories"
                    className={navClass}
                >
                    Categories
                </NavLink>

                <NavLink
                    to="/admin/questions"
                    className={navClass}
                >
                    Questions
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={navClass}
                >
                    Users
                </NavLink>

            </nav>

            <div className="absolute bottom-6 left-5 right-5">

                <button
                    onClick={handleLogout}
                    className="w-full rounded-lg bg-red-600 py-3 font-semibold hover:bg-red-700"
                >
                    Logout
                </button>

            </div>

        </aside>

    );

};

export default AdminSidebar;