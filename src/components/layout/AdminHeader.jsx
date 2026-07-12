import { useSelector } from "react-redux";

const AdminHeader = () => {

    const user = useSelector(
        state => state.auth.userData
    );

    return (

        <header className="fixed left-64 right-0 top-0 z-10 border-b border-slate-800 bg-slate-900 px-8 py-5">

            <div>

                <h2 className="text-3xl font-bold text-white">

                    Welcome,

                    {user?.name}

                </h2>

                <p className="text-slate-400">

                    Manage your AI Interview Platform

                </p>

            </div>

        </header>

    );

};

export default AdminHeader;