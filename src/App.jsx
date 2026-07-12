import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import authService from "./appwrite/auth";
import { login, logout } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return <Outlet />;
}

export default App;