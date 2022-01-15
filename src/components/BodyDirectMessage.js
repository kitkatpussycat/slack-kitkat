import React, { useState, useEffect, useRef } from "react";
import { sendMessage } from "../api/slack-api";
import { getUsers } from "../api/slack-api";
import { useAuth } from "../context/AuthContextProvider";
import { getUserMessages } from "../api/slack-api";
import { FiSend } from "react-icons/fi";
import { BsMenuApp } from "react-icons/bs";
import { Link } from "react-router-dom";
import SidebarModal from "./SidebarModal";
import { FiRefreshCcw } from "react-icons/fi";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/croodles";
import Avatars from "../api/Avatars";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams } from "react-router-dom";

let svg = createAvatar(style, {
  seed: "custom-seed",
  // ... and other options
});

const BodyDirectMessage = () => {
  const { state } = useAuth();
  const [listOfUsers, setListOfUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUser, setFilteredUser] = useState(listOfUsers);
  const [selectedUser, setSelectedUser] = useState("");
  const [directUser, setDirectUser] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [openSidebarModal, setOpenSidebarModal] = useState(false);
  const params = useParams();

  ///////////////////////////////////////////////from stockoverflow..
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  ///////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    (async () => {
      const users = await getUsers(state.headers);
      setListOfUsers(users);
    })();
    console.log(listOfUsers);
  }, []);

  // const getFinalUser = async (lala, id) => {
  //   let lalo = lala.find((lalo) => lala.id === parseInt(id));
  //   console.log(lalo);
  //   return lalo;
  // };

  // getFinalUser(listOfUsers, params.id);

  useEffect(() => {
    if (search === "") {
      setFilteredUser(listOfUsers);
    } else {
      setFilteredUser(
        listOfUsers.filter((user) => {
          return user.uid.toLowerCase().includes(search.toLowerCase());
        })
      );
    }
  }, [search, listOfUsers]);

  const handleSelectedUser = (e, selected) => {
    e.preventDefault();
    setSelectedUser(selected.uid);
    setSearch("");
    setDirectUser(selected);
    console.log(selectedUser);
    console.log("nagana ba ito?");
    console.log(directUser);
  };

  const handleDeleteSelectedUser = (e, s) => {
    e.preventDefault();
    setSelectedUser("");
    setMessages([]);
  };

  const handleSend = async (e) => {
    // e.preventDefault();

    if (selectedUser === "" && message === "") {
      alert("Please enter an email or message");
    } else {
      await sendMessage(state.headers, params.id, "User", message);
      // setSelectedUser("");
      // setDirectUser("");
      setMessage("");
    }
  };

  // const handleKeyPress = (event) => {
  //   if (event.key == "Enter") {
  //     handleSend();
  //   }
  // };

  const handleKeyUp = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (
      (e.code === "Enter" || (e.location === 3 && e.key === "Enter")) &&
      e.shiftKey
    ) {
      setMessage(message + "\n");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        const msgs = await getUserMessages(state.headers, params.id);
        console.log(msgs);
        // console.log(msgs.length);
        setMessages(msgs);
      })();
    }, 1000);
    console.log(messages);
    // console.log(messages.length);
    console.log(selectedUser);

    return () => clearInterval(interval);
  }, [params.id]);

  // useEffect(() => {
  //   (async () => {
  //     const msgs = await getUserMessages(state.headers, params.id);
  //     console.log(msgs);
  //     // console.log(msgs.length);
  //     setMessages(msgs);
  //   })();
  // }, [params.id]);
  // console.log(messages);
  // // console.log(messages.length);
  // console.log(selectedUser);

  const getDate = (date) => {
    let r = new Date(date);
    return <span>{r.toDateString()}</span>;
  };

  const handleReload = async (e) => {
    const msgs = await getUserMessages(state.headers, params.id);
    setMessages(msgs);
  };

  return (
    <div className=" h-screen grid grid-rows-6 grid-flow-col p-5">
      <div className="row-span-1 col-span-2 card flex justify-start lg:text-xl rounded-t-xl">
        <div className="w-full">
          <input
            className="xs:w-1/2 lg:w-1/4 mx-2 my-2 bg-transparent border-2 border-slate-600 p-2"
            type="text"
            placeholder="search user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <p>{search}</p> */}
          {search === "" ? (
            <div></div>
          ) : (
            <div className="mx-2 mb-5 card xs:w-1/2 lg:w-1/4 h-1/2 overflow-y-auto overflow-x-hidden">
              <div>
                {filteredUser.map((listOfUser) => (
                  <div
                    className="hover:text-slate-300 flex justify-start cursor-pointer"
                    key={listOfUser.id}
                    onClick={(e) => handleSelectedUser(e, listOfUser)}
                  >
                    {" "}
                    <Link to={`/dashboard/bodydirectmessage/${listOfUser.id}`}>
                      {listOfUser.uid}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-between">
            <div className="flex items-center">
              {/* to:{" "} */}
              <span className="md:text-xl lg:text-xl font-bold mx-2">
                {selectedUser}
                {selectedUser === "" ? (
                  <div></div>
                ) : (
                  <button
                    className="btn-red hover:bg-red-800 text-sm py-0 hover:px-4"
                    onClick={(e) => {
                      handleDeleteSelectedUser(e);
                    }}
                  >
                    X
                  </button>
                )}
              </span>
            </div>
            <button
              className="md:hidden lg:hidden absolute right-5 top-5"
              onClick={() => {
                setOpenSidebarModal(true);
              }}
            >
              <BsMenuApp />
            </button>
            {openSidebarModal && (
              <SidebarModal openSidebarModal={setOpenSidebarModal} />
            )}
            <div>
              <button onClick={handleReload} className="lg:text-5xl px-5">
                <FiRefreshCcw />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-4 col-span-2 overflow-y-auto overflow-x-hidden card">
        {" "}
        {messages === undefined ? (
          <div className="text-center font-bold"></div>
        ) : (
          messages.map(
            //kinopya ko lang
            (msg, index) => (
              <div
                className={`mb-5 w-full xs:text-xs md:text-lg ${
                  msg.sender.id === state.user.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`${
                    msg.sender.id === state.user.id ? "text-right" : "text-left"
                  }`}
                >
                  <p className="text-xs py-0 mx-3">{getDate(msg.created_at)}</p>{" "}
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
                      className={`text-bubble text-justify py-1 px-5 w-fit inline-block ${
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
            className="w-11/12 h-3/4 lg:w-11/12 lg:h-1/2 text-white mx-1 resize-none p-2 rounded-lg bg-transparent border-2 border-white"
            placeholder={`Message  ${selectedUser}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => handleKeyUp(e)}
          ></textarea>{" "}
          <button
            className=" px-0 py-0 text-xs mx-1 text-white lg:font-bold lg:text-3xl"
            onClick={(e) => handleSend(e)}
          >
            <FiSend />
            {/* Send */}
          </button>
        </div>
        {/* <div className="flex items-center justify-start w-1/6 lg:w-1/12">
          <button
            className="btn-gradient lg:px-8 lg:font-bold rounded-lg text-sm"
            onClick={(e) => handleSend(e)}
          >
            Send
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default BodyDirectMessage;
