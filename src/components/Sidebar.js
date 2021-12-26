import React, { useState, useEffect } from "react";
import AddChannelModal from "./AddChannelModal";
import { getChannels } from "../api/slack-api";
import { useAuth } from "../context/AuthContextProvider";
import AddUserModal from "./AddUserModal";
import { Link } from "react-router-dom";
import SendMessageModal from "./SendMessageModal";

const Sidebar = () => {
  const [openAddChannelModal, setOpenAddChannelModal] = useState(false);
  const { state } = useAuth();
  const [channels, setChannels] = useState([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [userDirectMessage, setUserDirectMessage] = useState([]);
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
      <div className="flex bg-red-500 h-screen flex-col justify-start">
        <div className="mb-0 bg-yellow-500 pb-8">
          <h1 className="mt-5 text-3xl font-bold underline">Slack</h1>
        </div>
        <div className="bg-blue-500 h-5/6">
          <div className="mb-2 mt-5">
            <h1 className="font-bold">Channel</h1>
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
        <div>
          <button className="text-3xl font-bold mt-5" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
