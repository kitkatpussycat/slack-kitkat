import React, { useState, useEffect } from "react";
import AddChannelModal from "./AddChannelModal";
import { getChannels } from "../api/slack-api";
import { useAuth } from "../context/AuthContextProvider";
import AddUserModal from "./AddUserModal";
import { Link } from "react-router-dom";
import SendMessageModal from "./SendMessageModal";
import { getUserMessages, getUsers } from "../api/slack-api";

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

  const channelNameHandler = (e, name) => {
    e.preventDefault();
    alert(name);
  };

  return (
    <div>
      <div className=" h-screen  grid grid-rows-6 gap-4 py-3 lg:py-3 px-0 lg:px-5 mx-2 my-1">
        <div className=" card rounded-lg row-span-1 col-span-1 flex justify-center items-center">
          <h1 className=" text-lg lg:text-5xl font-bold underline">Slack</h1>
        </div>
        <div className="card rounded-lg row-span-4 overflow-y-auto overflow-x-hidden">
          <div className="mb-2 mt-5">
            <h1 className="font-bold">Channels</h1>
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
          <div>
            {channels.map((channel) => (
              <div className="flex flex-row items-center justify-center">
                <div
                  className="hover:underline"
                  key={channel.id}
                  // onClick={(e) => channelNameHandler(e, channel.name)}
                >
                  <Link to={`/dashboard/body/${channel.id}`}>
                    {channel.name}
                  </Link>
                </div>
                <span
                  className="cursor-pointer font-bold"
                  onClick={() => {
                    setOpenAddUserModal(true);
                  }}
                >
                  +
                </span>
              </div>
            ))}
          </div>
          {openAddUserModal && (
            <AddUserModal closeAddUserModal={setOpenAddUserModal} />
          )}
          <div>
            <h1 className="font-bold">Direct Message</h1>
            <h1
              className="cursor-pointer"
              onClick={() => {
                setOpenSendMessageModal(true);
              }}
            >
              Message User
            </h1>
            {openSendMessageModal && (
              <SendMessageModal
                closeSendMessageModal={setOpenSendMessageModal}
              />
            )}
            <Link to={`/dashboard/bodydirectmessage`}>Send Message</Link>
          </div>
        </div>

        <div className=" card rounded-lg row-span-1 flex items-center justify-center">
          <button
            className="text-md lg:text-3xl font-bold bg-pink-600 py-3 px-5 rounded-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
