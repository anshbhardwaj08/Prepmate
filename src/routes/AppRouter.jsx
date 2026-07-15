import App from "../App";
import { createBrowserRouter } from "react-router-dom";
 
// Layouts
import PublicLayout from "../components/layout/PublicLayout";
import CandidateLayout from "../components/layout/CandidateLayout";
import AdminLayout from "../components/layout/AdminLayout";
 
// Auth
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminProtectedRoute from "../components/auth/AdminProtectedRoute";
 
// Public Pages
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
 
// Candidate Pages
import Dashboard from "../pages/candidate/Dashboard";
import Profile from "../pages/candidate/Profile";
import Interview from "../pages/candidate/Interview";
import InterviewGuidelines from "../pages/candidate/InterviewGuidelines"; // ← new
import Results from "../pages/candidate/Results";
import History from "../pages/candidate/History";
import CandidateCategories from "../pages/candidate/CandidateCategories";
import Contests from "../pages/candidate/Contests";
 
// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import Questions from "../pages/admin/Questions";
import Categories from "../pages/admin/Categories";
import Users from "../pages/admin/Users";
 
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
 
            // ── PUBLIC ──────────────────────────────────────────────────────
            {
                element: <PublicLayout />,
                children: [
                    { index: true, element: <Landing /> },
                    {
                        path: "login",
                        element: (
                            <ProtectedRoute authentication={false}>
                                <Login />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "signup",
                        element: (
                            <ProtectedRoute authentication={false}>
                                <Signup />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
 
            // ── CANDIDATE ───────────────────────────────────────────────────
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <CandidateLayout />
                    </ProtectedRoute>
                ),
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: "history",    element: <History /> },
                    { path: "categories", element: <CandidateCategories /> },
                    { path: "profile",    element: <Profile /> },
                    { path: "contests",   element: <Contests /> },
 
                    // ✅ Guidelines page — shown BEFORE the interview
                    {
                        path: "interview/guidelines/:categoryId",
                        element: <InterviewGuidelines />,
                    },
 
                    // ✅ Actual interview — only reachable from guidelines page
                    {
                        path: "interview/:categoryId",
                        element: <Interview />,
                    },
 
                    { path: "results/:resultId", element: <Results /> },
                ],
            },
 
            // ── ADMIN ────────────────────────────────────────────────────────
            {
                path: "admin",
                element: (
                    <AdminProtectedRoute>
                        <AdminLayout />
                    </AdminProtectedRoute>
                ),
                children: [
                    { index: true,          element: <AdminDashboard /> },
                    { path: "questions",    element: <Questions /> },
                    { path: "categories",   element: <Categories /> },
                    { path: "users",        element: <Users /> },
                ],
            },
        ],
    },
]);

export default router;