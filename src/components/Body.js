import React, { useState, useEffect } from "react";
import { getChannelDetail } from "../api/slack-api";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import AddMemberModal from "./AddMemberModal";

const Body = () => {
  ////////////////////////////////////////////////////////kinopya ko
  const params = useParams();
  const { state } = useAuth();
  const [channelData, setChannelData] = useState({});

  /////////////////////////////////////////////////mine
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);

  ////////////////////////////////////////////////////////kinopya ko
  useEffect(() => {
    (async () => {
      const data = await getChannelDetail(state.headers, params.id);
      setChannelData(data);
      console.log(channelData);
      console.log(params);
      console.log(params.id);
      console.log(state.id);
      console.log(state.headers);
    })();
  }, [params.id]);

  return (
    <div className="bg-purple-500 h-screen grid grid-rows-6 grid-flow-col gap-1">
      <div className="row-span-1 col-span-2 bg-blue-100 flex justify-around text-3xl">
        {/* <div>{channelData.name} Channel</div> */}
        <div
          className="cursor-pointer font-bold"
          onClick={() => {
            setOpenAddMemberModal(true);
          }}
        >
          Add Member
        </div>
        {openAddMemberModal && (
          <AddMemberModal
            closeAddMemberModal={setOpenAddMemberModal}
            channelId={params.id}
          />
        )}
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
