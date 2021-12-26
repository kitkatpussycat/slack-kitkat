import React, { useState, useEffect } from "react";
import { sendMessage } from "../api/slack-api";
import { getUsers } from "../api/slack-api";
import { useAuth } from "../context/AuthContextProvider";
import { getUserMessages } from "../api/slack-api";

const BodyDirectMessage = () => {
  const { state } = useAuth();
  const [listOfUsers, setListOfUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUser, setFilteredUser] = useState(listOfUsers);
  const [selectedUser, setSelectedUser] = useState("");
  const [directUser, setDirectUser] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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
    e.preventDefault();

    if (selectedUser === "" && message === "") {
      alert("Please enter an email or message");
    } else {
      await sendMessage(state.headers, directUser.id, "User", message);
      setSelectedUser("");
      setDirectUser("");
      setMessage("");
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

  return (
    <div className="bg-slate-300 h-screen grid grid-rows-6 grid-flow-col gap-1">
      <div className="row-span-1 col-span-2 bg-blue-900 flex justify-start">
        <div>
          <input
            className="w-full"
            type="text"
            placeholder="search user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <p>{search}</p> */}
          {search === "" ? (
            <div></div>
          ) : (
            <div className="mt-5 mb-5 bg-blue-900 w-full h-1/2 overflow-y-auto overflow-x-hidden">
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
            <span className="text-3xl font-bold">
              {selectedUser}
              {selectedUser === "" ? (
                <div></div>
              ) : (
                <button
                  className="bg-red-600 text-sm rounded-lg"
                  onClick={(e) => {
                    handleDeleteSelectedUser(e);
                  }}
                >
                  delete
                </button>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="row-span-4 col-span-2 bg-sky-600 py-2 px-2 overflow-y-auto overflow-x-hidden">
        {" "}
        {messages === undefined ? (
          <div></div>
        ) : (
          messages.map(
            //kinopya ko lang
            (msg, index) => (
              <div
                className={`leading-10 ${
                  msg.sender.id === state.user.id ? "text-right" : "text-left"
                }`}
              >
                <span className="bg-slate-300 rounded-lg py-1 px-1">
                  {msg.body}{" "}
                </span>
                <span className="text-xs">from {msg.sender.email}</span>
              </div>
            )
          )
        )}
      </div>
      <div className="row-span-1 col-span-2 bg-blue-900 flex flex-row">
        <div className="w-11/12 flex justify-center items-center">
          <textarea
            className="w-11/12 h-1/2"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>{" "}
        </div>
        <div className="flex items-center justify-center w-1/12">
          <button
            className="bg-red-600 px-8 font-bold rounded-lg"
            onClick={(e) => handleSend(e)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BodyDirectMessage;
