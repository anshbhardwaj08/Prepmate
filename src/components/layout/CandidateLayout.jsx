import { Outlet } from "react-router-dom";

import CandidateSidebar from "./CandidateSidebar";
import CandidateHeader from "./CandidateHeader";

const CandidateLayout = () => {

    return (

        <div className="bg-slate-950">

            <CandidateSidebar />

            <div className="ml-64 flex min-h-screen flex-col">

                <CandidateHeader />

                <main className="flex-1 p-8 ">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default CandidateLayout;