import React from "react";
import { useAuth } from "../context/AuthContextProvider";

function Dashboard() {
  const { dispatch } = useAuth();
  const handleLogout = (e) => {
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <div>
      <h1>DASHBOARD</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
