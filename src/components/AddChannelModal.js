import React, { useState } from "react";
import ReactDOM from "react-dom";
import { createChannel } from "../api/slack-api";
import { useAuth } from "../context/AuthContextProvider";

const AddChannelModal = ({ closeChannelModal }) => {
  const [channelName, setChannelName] = useState("");
  const [users, setUsers] = useState([]);
  const { state } = useAuth();

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    const [data, status] = await createChannel(
      users,
      channelName,
      state.headers
    );
    if (status === 200) {
      alert("You created a new channel!");
    }
    closeChannelModal(false);
    console.log(data);
  };

  return ReactDOM.createPortal(
    <div className="modalBackGround">
      <div className="bg-modal px-20 py-5 xs:w-fit xs:h-fit flex flex-col items-center gap-5">
        <div className="title">
          <h1 className="text-center font-bold">Add New Channel</h1>
        </div>
        <div className="w-full bg-red-700">
          <input
            className="text-black w-full"
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
          {/* <p>{channelName}</p> */}
        </div>

        <div className="footer flex justify-around w-3/4">
          <button
            className="card p-3 hover:bg-blue-900 transition-all"
            onClick={() => closeChannelModal(false)}
          >
            Cancel
          </button>
          <button
            className="card p-3 hover:bg-blue-900 transition-all"
            onClick={handleCreateChannel}
          >
            Continue
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
export default AddChannelModal;
