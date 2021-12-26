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
  };

  return ReactDOM.createPortal(
    <div className="modalBackGround">
      <div className="card bg-yellow-500 px-20 py-5 w-1/4 h-1/4">
        <div className="title ">
          <h1 className="text-center font-bold">Add New Channel</h1>
        </div>
        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <p>{channelName}</p>

        <div className="footer">
          <button
            className="btn-red dark:bg-gradient-pink"
            onClick={() => closeChannelModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn-red dark:bg-gradient-pink"
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
