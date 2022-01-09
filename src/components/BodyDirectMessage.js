import React, { useState, useEffect, useRef } from "react";
import { sendMessage } from "../api/slack-api";
import { getUsers } from "../api/slack-api";
import { useAuth } from "../context/AuthContextProvider";
import { getUserMessages } from "../api/slack-api";
import { FiSend } from "react-icons/fi";
import { BsMenuApp } from "react-icons/bs";
import { Link } from "react-router-dom";

const BodyDirectMessage = () => {
  const { state } = useAuth();
  const [listOfUsers, setListOfUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUser, setFilteredUser] = useState(listOfUsers);
  const [selectedUser, setSelectedUser] = useState("");
  const [directUser, setDirectUser] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  ///////////////////////////////////////////////from stockoverflow..
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  /////////////////////////////////////////////////////////
  useEffect(() => {
    (async () => {
      const users = await getUsers(state.headers);
      setListOfUsers(users);
    })();

    console.log(listOfUsers);
  }, []);

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
    // setSelectedUser(selectedUser.filter((t) => t !== s));
  };

  const handleSend = async (e) => {
    // e.preventDefault();

    if (selectedUser === "" && message === "") {
      alert("Please enter an email or message");
    } else {
      await sendMessage(state.headers, directUser.id, "User", message);
      // setSelectedUser("");
      // setDirectUser("");
      setMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key == "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    (async () => {
      const msgs = await getUserMessages(state.headers, directUser.id);
      console.log(msgs);
      setMessages(msgs);
      // spanRef.current.scrollIntoView({ behavior: "smooth" });
    })();
  }, [directUser.id]);
  console.log(messages);
  console.log(selectedUser);

  const getDate = (date) => {
    let r = new Date(date);
    return <span>{r.toDateString()}</span>;
  };

  const handleReload = async (e) => {
    const msgs = await getUserMessages(state.headers, directUser.id);
    setMessages(msgs);
  };

  return (
    <div className=" h-screen grid grid-rows-6 grid-flow-col lg:gap-2">
      <div className="row-span-1 col-span-2 card flex justify-start lg:text-xl">
        <div>
          <input
            className="w-full text-black mx-2 my-2"
            type="text"
            placeholder="search user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <p>{search}</p> */}
          {search === "" ? (
            <div></div>
          ) : (
            <div className="mx-2 mb-5 card w-full h-1/2 overflow-y-auto overflow-x-hidden">
              <div>
                {filteredUser.map((listOfUser) => (
                  <div
                    className="hover:text-slate-300 flex justify-start cursor-pointer"
                    key={listOfUser.id}
                    onClick={(e) => handleSelectedUser(e, listOfUser)}
                  >
                    {listOfUser.uid}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            {/* to:{" "} */}
            <span className="md:text-xl lg:text-xl font-bold mx-2">
              {selectedUser}
              {selectedUser === "" ? (
                <div></div>
              ) : (
                <button
                  className="btn-gradient text-sm py-0"
                  onClick={(e) => {
                    handleDeleteSelectedUser(e);
                  }}
                >
                  delete
                </button>
              )}
            </span>
            <button className="lg:hidden">
              <Link to={`/dashboard/sidebar`}>
                <BsMenuApp />
              </Link>
            </button>
            <button className="btn-gradient" onClick={handleReload}>
              pindutin ako
            </button>
          </div>
        </div>
      </div>
      <div className="row-span-4 col-span-2 overflow-y-auto overflow-x-hidden card">
        {" "}
        {messages === undefined ? (
          <span></span>
        ) : (
          messages.map(
            //kinopya ko lang
            (msg, index) => (
              <div
                className={`mb-5 ${
                  msg.sender.id === state.user.id ? "text-right" : "text-left"
                }`}
              >
                <p className="text-xs py-0 mx-3">
                  {getDate(msg.sender.created_at)}
                </p>{" "}
                <span className="card-g rounded-3xl py-1 px-5 mx-3 lg:text-xl">
                  {msg.body}{" "}
                </span>
              </div>
            )
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="row-span-1 col-span-2 card flex flex-row">
        <div className="w-full lg:w-full flex justify-center items-center">
          <textarea
            className="w-11/12 lg:w-11/12 h-1/2 text-black mx-1"
            placeholder={`Message  ${selectedUser}`}
            // ${
            //   selectedUser === "" ? (
            //     <span>lala</span>
            //   ) : (
            //     <span>{selectedUser}</span>
            //   )
            // }
            // `}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
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
