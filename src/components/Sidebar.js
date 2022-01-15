import React, { useState, useEffect } from "react";
import AddChannelModal from "./AddChannelModal";
import { getChannels } from "../api/slack-api";
import { useAuth } from "../context/AuthContextProvider";
import { Link } from "react-router-dom";
import { getUserMessages, getUsers } from "../api/slack-api";
import { BsFlower2 } from "react-icons/bs";

const Sidebar = () => {
  const [openAddChannelModal, setOpenAddChannelModal] = useState(false);
  const { state } = useAuth();
  const [channels, setChannels] = useState([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openSendMessageModal, setOpenSendMessageModal] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getChannels(state.headers);
      setChannels(data);
    })();

    console.log(channels);
  }, []);

  const { dispatch } = useAuth();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  console.log(state.data);

  return (
    <div className="md:w-screen lg:w-screen text-xs md:text-base lg:text-base">
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <div className=" rounded-lg flex absolute top-10 left-15 px-4">
          <h1 className=" text-lg lg:text-5xl font-bold flex flex-row">
            Slack <BsFlower2 />
          </h1>
        </div>
        <div className=" text-md font-bold">Hello {state.headers.uid}!</div>
        <div className="h-2/3 w-5/6 rounded-lg overflow-y-auto overflow-x-hidden border-2 flex flex-col items-center">
          <div className="mb-2 mt-5">
            <h1 className="font-bold">CHANNELS</h1>
            <h1
              className="cursor-pointer underline"
              onClick={() => {
                setOpenAddChannelModal(true);
              }}
            >
              Add Channel
            </h1>
            {openAddChannelModal && (
              <AddChannelModal closeChannelModal={setOpenAddChannelModal} />
            )}
          </div>

          <div className="card rounded-lg w-5/6 overflow-y-auto overflow-x-hidden h-1/2 p-2 flex flex-col items-center">
            {channels === undefined ? (
              <div className="text-center font-bold"></div>
            ) : (
              channels.map((channel) => (
                <div className="w-full">
                  <div
                    className="hover:bg-blue-900 transition-all"
                    key={channel.id}
                  >
                    <Link to={`/dashboard/body/${channel.id}`}>
                      {channel.name}
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="w-full flex flex-col items-center">
            <h1 className="font-bold">DIRECT MESSAGE</h1>
            <div className="w-full hover:underline text-center">
              <Link to={`/dashboard/bodydirectmessage`}>Send Message</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg absolute bottom-2 left-5">
        <button
          className="text-md lg:text-xl font-bold btn-medium hover:bg-blue-900 py-2 px-2 rounded-xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
