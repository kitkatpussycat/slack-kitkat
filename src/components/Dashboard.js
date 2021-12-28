import React from "react";
import { useAuth } from "../context/AuthContextProvider";
import Sidebar from "./Sidebar";
import Body from "./Body";
import { Outlet } from "react-router-dom";

function Dashboard() {
  // const { dispatch } = useAuth();
  // const handleLogout = (e) => {
  //   dispatch({
  //     type: "LOGOUT",
  //   });
  // };
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-0">
      <div className="row-span-3">
        <Sidebar />
      </div>
      <div className="col-span-8 h-screen bg-spider">
        {/* <h1 className="text-3xl font-bold underline">DASHBOARD</h1>
        <button onClick={handleLogout}>Logout</button> */}
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
