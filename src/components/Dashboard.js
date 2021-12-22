import React from "react";
import { useAuth } from "../context/AuthContextProvider";
import Sidebar from "./Sidebar";
import Body from "./Body";

function Dashboard() {
  // const { dispatch } = useAuth();
  // const handleLogout = (e) => {
  //   dispatch({
  //     type: "LOGOUT",
  //   });
  // };
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-1">
      <div className="row-span-3">
        <Sidebar />
      </div>
      <div className="col-span-8">
        {/* <h1 className="text-3xl font-bold underline">DASHBOARD</h1>
        <button onClick={handleLogout}>Logout</button> */}
        <Body />
      </div>
    </div>
  );
}

export default Dashboard;
