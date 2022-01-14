import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getChannelDetail, getUsers } from "../api/slack-api";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import { Link } from "react-router-dom";

const ChannelDetailsModal = ({ openChannelDetailsModal, allUsers }) => {
  const [channelMember, setChannelMember] = useState([]);
  const params = useParams();
  const { state } = useAuth();
  const [channelData, setChannelData] = useState({});
  const [listOfUsers, setListOfUsers] = useState([]);
  const arr = allUsers();
  const handleClose = () => {
    openChannelDetailsModal(false);
  };

  // useEffect(() => {
  //   (async () => {
  //     const data = await getChannelDetail(state.headers, params.id);
  //     setChannelData(data);
  //     setChannelMember(data.channel_members);
  //     console.log(channelData);
  //     //   console.log(params);
  //     //   console.log(params.id);
  //     //   console.log(state.id);
  //     //   console.log(state.headers);
  //     console.log(channelMember);
  //   })();
  // }, [params.id]);

  console.log(arr);

  return ReactDOM.createPortal(
    <div className="modalBackGround md:text-2xl">
      <div className="bg-modal px-20 py-5 w-screen h-screen lg:w-1/4 lg:h-3/4 relative flex items-center flex-col">
        <div className="w-screen h-screen p-10 flex items-center flex-col">
          <h1>Members</h1>
          <div className="xs:w-full xs:h-full lg:w-1/5 card mt-5 overflow-y-auto overflow-x-hidden rounded-xl">
            <ul>
              {arr.map((member) => (
                <li key={member.id}>
                  <Link
                    to={`/dashboard/bodydirectmessage/${member.id}`}
                    className="hover:bg-blue-900 transition-all"
                  >
                    {member.uid}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button
              className="btn-go hover:bg-blue-900 mt-5 p-2 transition-all rounded-lg"
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ChannelDetailsModal;
