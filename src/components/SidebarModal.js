import React, { useState, useEffect } from "react";
import AddChannelModal from "./AddChannelModal";
import { getChannels } from "../api/slack-api";
import { useAuth } from "../context/AuthContextProvider";
import { Link } from "react-router-dom";
import { getUserMessages, getUsers } from "../api/slack-api";
import { BsFlower2 } from "react-icons/bs";
import ReactDOM from "react-dom";

const SidebarModal = ({ openSidebarModal }) => {
  const [openAddChannelModal, setOpenAddChannelModal] = useState(false);
  const { state } = useAuth();
  const [channels, setChannels] = useState([]);

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

  return ReactDOM.createPortal(
    <div className="text-md md:text-base lg:text-base">
      <div className="sideModalBackGround flex flex-col justify-center items-center">
        <div className=" rounded-lg flex absolute top-10 left-15 px-4">
          <h1 className=" text-3xl lg:text-5xl font-bold flex flex-row">
            Slack <BsFlower2 />
          </h1>
        </div>
        <div className="h-2/3 w-3/4 rounded-lg overflow-y-auto overflow-x-hidden border-2 flex flex-col items-center">
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
          <div className="card rounded-lg w-1/2 overflow-y-auto overflow-x-hidden h-1/2 p-2 mb-5">
            {channels.map((channel) => (
              <div>
                <div className="hover:underline" key={channel.id}>
                  <Link
                    to={`/dashboard/body/${channel.id}`}
                    onClick={() => openSidebarModal(false)}
                  >
                    {channel.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h1 className="font-bold">Direct Message</h1>

            <Link to={`/dashboard/bodydirectmessage`}>Send Message</Link>
          </div>
        </div>
        <div className="flex flex-row mt-8">
          <div>
            <button
              className="btn-go px-2 py-2 mx-2 font-bold"
              onClick={() => openSidebarModal(false)}
            >
              Back
            </button>
          </div>
          <div>
            <button
              className="text-md lg:text-xl font-bold btn-medium px-2 py-2 mx-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default SidebarModal;
