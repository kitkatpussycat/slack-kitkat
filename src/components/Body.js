import React, { useState, useEffect } from "react";
import { getChannelDetail } from "../api/slack-api";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import AddMemberModal from "./AddMemberModal";
import { getChannelMessages, sendMessage } from "../api/slack-api";

const Body = () => {
  ////////////////////////////////////////////////////////kinopya ko
  const params = useParams();
  const { state } = useAuth();
  const [channelData, setChannelData] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    (async () => {
      const msgs = await getChannelMessages(state.headers, params.id);
      // console.log(msgs);
      setMessages(msgs);
      // spanRef.current.scrollIntoView({ behavior: "smooth" });
    })();
  }, [params.id]);

  const handleSend = async (e) => {
    //kinopya ko lang
    e.preventDefault();
    if (message === "") {
      alert("nah");
    } else {
      await sendMessage(state.headers, channelData.id, "Channel", message);
      setMessage("");
    }
  };

  console.log([messages]);

  return (
    <div className=" h-screen grid grid-rows-6 grid-flow-col gap-4 px-0 py-3 mx-2 my-1">
      <div className="row-span-1 col-span-2 card flex justify-start lg:text-3xl">
        <div className="font-bold">
          {channelData.name}
          <button
            className="cursor-pointer font-bold text-sm bg-pink-600 rounded-lg px-2 mx-2"
            onClick={() => {
              setOpenAddMemberModal(true);
            }}
          >
            Add Member
          </button>
        </div>
        {openAddMemberModal && (
          <AddMemberModal
            closeAddMemberModal={setOpenAddMemberModal}
            channelId={params.id}
          />
        )}
      </div>
      <div className="row-span-4 col-span-2 overflow-y-auto overflow-x-hidden card">
        {" "}
        {messages.map(
          //kinopya ko lang
          (msg, index) => (
            <div
              className={`  ${
                msg.sender.id === state.user.id ? "text-right" : "text-left"
              }`}
            >
              <p className="text-slate-300 text-xs px-2">{msg.sender.email}</p>
              <div className="leading-10">
                <span className="card rounded-lg py-1 px-1 mx-3 lg:text-xl">
                  {msg.body}{" "}
                </span>
                {/* <span className="text-xs text-slate-300">
                  at {msg.sender.created_at}
                </span> */}
              </div>
            </div>
          )
        )}
      </div>
      <div className="row-span-1 col-span-2 card flex flex-row">
        <div className="w-5/6 lg:w-11/12 flex justify-center items-center">
          <textarea
            className="w-11/12 h-1/2 bg-slate-300 text-black"
            placeholder={`Message ${channelData.name}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>{" "}
        </div>
        <div className="flex items-center justify-center w-1/6 lg:w-1/12">
          <button
            className="bg-pink-600 px-1 lg:px-8 lg:font-bold text-xs lg:text-lg rounded-full"
            onClick={(e) => handleSend(e)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
