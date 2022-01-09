import React, { useState, useEffect, useRef } from "react";
import { getChannelDetail } from "../api/slack-api";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import AddMemberModal from "./AddMemberModal";
import { getChannelMessages, sendMessage } from "../api/slack-api";
import { CgUserAdd } from "react-icons/cg";
import { FiSend } from "react-icons/fi";
import { BsMenuApp } from "react-icons/bs";
import { Link } from "react-router-dom";

const Body = () => {
  ////////////////////////////////////////////////////////kinopya ko
  const params = useParams();
  const { state } = useAuth();
  const [channelData, setChannelData] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  /////////////////////////////////////////////////mine
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);

  /////////////////////////////////////////////////galing sa stock overflow... copy paste lang using useRef
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    // e.preventDefault();
    if (message === "") {
      alert("cannot be blank");
    } else {
      await sendMessage(state.headers, channelData.id, "Channel", message);
      setMessage("");
      // setTimeout(function () {
      //   window.location.reload();
      // }, 100);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key == "Enter") {
      handleSend();
    }
  };

  const handleReload = async (e) => {
    const msgs = await getChannelMessages(state.headers, params.id);
    // console.log(msgs);
    setMessages(msgs);
  };

  const getDate = (date) => {
    let r = new Date(date);
    return <span>{r.toDateString()}</span>;
  };

  console.log([messages]);

  return (
    <div className="h-screen grid grid-rows-6 grid-flow-col gap-1 lg:gap-2 text-xs lg:text-lg">
      <div className="row-span-1 col-span-2 card flex justify-around items-center">
        <div className="font-bold flex flex-row items-center">
          <div className="text-lg lg:text-3xl">{channelData.name}</div>
          <button
            className="cursor-pointer px-0 py-0 lg:px-2 mx-2"
            onClick={() => {
              setOpenAddMemberModal(true);
            }}
          >
            <CgUserAdd />
          </button>
        </div>
        {openAddMemberModal && (
          <AddMemberModal
            closeAddMemberModal={setOpenAddMemberModal}
            channelId={params.id}
          />
        )}
        <button className="lg:hidden">
          <Link to={`/dashboard/sidebar`}>
            <BsMenuApp />
          </Link>
        </button>
        <button className="btn-gradient" onClick={handleReload}>
          Pindutin ako
        </button>
      </div>
      <div className="row-span-4 col-span-2 overflow-y-auto overflow-x-hidden card">
        {" "}
        {messages === undefined ? (
          <div></div>
        ) : (
          messages.map(
            //kinopya ko lang
            (msg, index) => (
              <div
                className={` mb-5 ${
                  msg.sender.id === state.user.id ? "text-right" : "text-left"
                }`}
              >
                <p className=" text-xs py-0 mx-3">
                  {msg.sender.email === state.user.email
                    ? "you"
                    : msg.sender.email}{" "}
                  {getDate(msg.sender.created_at)}
                </p>
                <div>
                  <span className="card-g rounded-3xl py-1 px-5 mx-3">
                    {msg.body}{" "}
                  </span>
                </div>
              </div>
            )
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="row-span-1 col-span-2 card flex flex-row">
        <div className="w-full lg:w-full flex justify-center items-center">
          <textarea
            className="w-11/12 h-1/2 text-black focus:outline-none"
            placeholder={`Message ${channelData.name}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          ></textarea>{" "}
          <button
            className=" px-0 py-0 text-xs mx-1 text-white lg:font-bold lg:text-3xl"
            onClick={(e) => handleSend(e)}
          >
            <FiSend />
          </button>
        </div>
        {/* <div className="flex items-center justify-center w-1/6 lg:w-1/12">
          <button
            className="btn-gradient px-1 lg:px-8 lg:font-bold text-xs lg:text-lg rounded-full"
            onClick={(e) => handleSend(e)}
          >
            Send
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Body;
