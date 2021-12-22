import React, { useState, useEffect } from "react";
import AddChannelModal from "./AddChannelModal";
import { getChannels } from "../api/slack-api";
import { useAuth } from "../context/AuthContextProvider";
import AddUserModal from "./AddUserModal";

const Sidebar = () => {
  const [openAddChannelModal, setOpenAddChannelModal] = useState(false);
  const { state } = useAuth();
  const [channels, setChannels] = useState([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getChannels(state.headers);
      setChannels(data);
    })();

    console.log(channels);
  }, []);

  return (
    <div>
      <div className="flex bg-red-500 h-screen flex-col justify-start">
        <div className="mb-10 bg-yellow-500 pb-8">
          <h1 className="mt-5 text-3xl font-bold underline">Slack</h1>
        </div>
        <div className="mb-2">
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
            <div
              className="hover:underline"
              key={channel.id}
              onClick={() => {
                setOpenAddUserModal(true);
              }}
            >
              {channel.name}
            </div>
          ))}
        </div>
        {openAddUserModal && (
          <AddUserModal closeAddUserModal={setOpenAddUserModal} />
        )}
        <div>
          <h1 className="font-bold">Direct Message</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
