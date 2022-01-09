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
    <div className="md:w-screen lg:w-screen text-xs md:text-base lg:text-base">
      <div className="h-screen card w-full flex flex-col justify-center items-center">
        <div className=" rounded-lg flex absolute top-10 px-4">
          <h1 className=" text-lg lg:text-5xl font-bold">Slack</h1>
        </div>
        <div className="h-2/3 w-5/6 rounded-lg overflow-y-auto overflow-x-hidden border-2 flex flex-col items-center">
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
          <div className="card rounded-2xl w-5/6 overflow-y-auto overflow-x-hidden h-1/2">
            {channels.map((channel) => (
              <div>
                <div
                  className="hover:underline"
                  key={channel.id}
                  // onClick={(e) => channelNameHandler(e, channel.name)}
                >
                  <Link to={`/dashboard/body/${channel.id}`}>
                    {channel.name}
                  </Link>
                </div>
                {/* <span
                  className="cursor-pointer font-bold"
                  onClick={() => {
                    setOpenAddUserModal(true);
                  }}
                >
                  +
                </span> */}
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

        {/* <div className="rounded-lg row-span-1 flex items-center justify-center bg-red-500">
          <button
            className="text-md lg:text-xl font-bold btn-gradient py-2 px-screen"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div> */}
      </div>
      {/* <div className=" h-20 lg:h-48 card mx-2 mt-1 mb-1 lg:mt-4 overflow-y-auto overflow-x-hidden">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div> */}
      <div className="rounded-lg absolute bottom-2">
        <button
          className="text-md lg:text-xl font-bold btn-gradient py-2 px-screen"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
