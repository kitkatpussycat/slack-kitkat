import React from "react";

const Body = () => {
  return (
    <div className="bg-purple-500 h-screen grid grid-rows-6 grid-flow-col gap-1">
      <div className="row-span-1 col-span-2 bg-blue-100">
        Channel Name / User Name
      </div>
      <div className="row-span-4 col-span-2 bg-blue-300">Message History</div>
      <div className="row-span-1 col-span-2 bg-blue-500 flex flex-row">
        <div className="w-11/12 flex justify-center items-center">
          <textarea className="w-11/12" placeholder="Message"></textarea>{" "}
        </div>
        <div className="flex items-center justify-center w-1/12">
          <button className="bg-red-500">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Body;
