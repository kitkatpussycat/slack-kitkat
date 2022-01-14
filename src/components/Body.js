import React, { useState, useEffect, useRef } from "react";
import { getChannelDetail, getUsers } from "../api/slack-api";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import AddMemberModal from "./AddMemberModal";
import { getChannelMessages, sendMessage } from "../api/slack-api";
import { CgUserAdd } from "react-icons/cg";
import { FiSend } from "react-icons/fi";
import { BsMenuApp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FiRefreshCcw } from "react-icons/fi";
import SidebarModal from "./SidebarModal";
import ChannelDetailsModal from "./ChannelDetailsModal";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/croodles";
import Avatars from "../api/Avatars";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

let svg = createAvatar(style, {
  seed: "custom-seed",
  // ... and other options
});

const Body = () => {
  ////////////////////////////////////////////////////////kinopya ko
  const params = useParams();
  const { state } = useAuth();
  const [channelData, setChannelData] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  /////////////////////////////////////////////////mine
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);
  const [openSidebarModal, setOpenSidebarModal] = useState(false);
  const [openChannelDetailsModal, setOpenChannelDetailsModal] = useState(false);

  ///////////////////////////////////////////////////////////////////////////testing
  const [channelMember, setChannelMember] = useState([]);
  const [listOfUsers, setListOfUsers] = useState([]);

  /////////////////////////////////////////////////galing sa stock overflow... copy paste lang using useRef
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  ////////////////////////////////////////////////////////kinopya ko
  useEffect(() => {
    (async () => {
      const data = await getChannelDetail(state.headers, params.id);
      setChannelData(data);
      setChannelMember(data.channel_members);
      console.log(channelData);
      console.log(channelMember);
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
  ///////////////////////////////////////////////////////////////////testing

  useEffect(() => {
    (async () => {
      const data = await getUsers(state.headers);
      setListOfUsers(data);
      console.log(listOfUsers);
    })();
  }, []);

  const allUsers = () => {
    let arr = [];
    for (let i = 0; i < channelMember.length; i++) {
      listOfUsers.forEach((user) => {
        if (user.id === channelMember[i].user_id) {
          arr.push(user);
          // debugger;
        }
      });
      console.log("array ng channel members", arr);
      // return arr;
    }
    return arr;
  };

  // const allUsers = () => {
  //   let arr = [];
  //   for (let i = 0; i < channelMember.length; i++) {
  //     for (let j = 0; j < listOfUsers.length; j++) {
  //       if (channelMember[i].user_id === listOfUsers[j].id) {
  //         arr.push(listOfUsers[j]);
  //         // debugger;
  //       }
  //     }
  //     console.log("array ng channel member", arr);
  //     return arr;
  //   }
  // };

  return (
    <div className="h-screen grid grid-rows-6 grid-flow-col text-xs lg:text-lg p-5">
      <div className="row-span-1 col-span-2 flex justify-between items-center px-5 card rounded-t-xl">
        <div className="font-bold flex flex-row items-center">
          <div
            className="text-lg lg:text-3xl hover:bg-blue-900 transition-all cursor-pointer"
            onClick={() => {
              setOpenChannelDetailsModal(true);
            }}
          >
            {channelData.name}
          </div>
          {openChannelDetailsModal && (
            <ChannelDetailsModal
              openChannelDetailsModal={setOpenChannelDetailsModal}
              allUsers={allUsers}
            />
          )}
          <button
            className="cursor-pointer px-0 py-0 lg:px-2 mx-2 hover:bg-blue-900 transition-all xs:text-xl lg:text-5xl"
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
        <div>
          <button
            className="md:hidden lg:hidden absolute right-5 top-5"
            onClick={() => {
              setOpenSidebarModal(true);
            }}
          >
            <BsMenuApp />
          </button>
        </div>
        {openSidebarModal && (
          <SidebarModal openSidebarModal={setOpenSidebarModal} />
        )}

        <button
          className="xs:text-xl lg:text-5xl px-2 hover:bg-blue-900 transition-all"
          onClick={handleReload}
        >
          <FiRefreshCcw />
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
                className={` mb-5 flex w-full xs:text-xs md:text-lg ${
                  msg.sender.id === state.user.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`leading-3 ${
                    msg.sender.id === state.user.id ? "text-right" : "text-left"
                  }`}
                >
                  <p className=" text-xs py-0 mx-3 text-blue-300">
                    {msg.sender.email === state.user.email
                      ? "You"
                      : msg.sender.email}{" "}
                    {getDate(msg.created_at)}
                  </p>
                  <div
                    className={`flex flex-row ${
                      msg.sender.email === state.user.email
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`mx-1 flex items-end ${
                        msg.sender.id === state.user.id ? "hidden" : "flex"
                      }`}
                    >
                      <Avatars user={msg.sender.email} size={20} />
                    </div>

                    <div
                      style={{ wordBreak: "break-word" }}
                      className={`text-bubble text-justify py-1 px-5 w-fit flex ${
                        msg.sender.id === state.user.id
                          ? "items-end"
                          : "items-start"
                      }`}
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.body}
                      </ReactMarkdown>
                    </div>
                    <div
                      className={`mx-1 flex items-end ${
                        msg.sender.id !== state.user.id ? "hidden" : "flex"
                      }`}
                    >
                      <Avatars user={msg.sender.email} size={20} />
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="row-span-1 col-span-2 card flex flex-row rounded-b-xl">
        <div className="w-full lg:w-full flex justify-center items-center xs:p-5 lg:p-1">
          <textarea
            className="w-11/12 h-3/4 lg:h-1/2 text-white focus:outline-none resize-none p-2 rounded-lg bg-transparent border-2 border-white"
            placeholder={`Message ${channelData.name}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          ></textarea>{" "}
          <button
            className=" px-0 py-0 text-xs mx-1 text-white lg:font-bold lg:text-3xl hover:bg-blue-900 transition-all"
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
