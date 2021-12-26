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
    <div className="bg-purple-500 h-screen grid grid-rows-6 grid-flow-col gap-1">
      <div className="row-span-1 col-span-2 bg-blue-100 flex justify-start">
        <div>
          <input
            type="text"
            placeholder="search user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <p>{search}</p> */}
          {search === "" ? (
            <div></div>
          ) : (
            <div className="mt-5 mb-5 bg-red-500 w-full h-1/2 overflow-y-auto overflow-x-hidden">
              <div>
                {filteredUser.map((listOfUser) => (
                  <div
                    className="hover:text-yellow-500 flex justify-start"
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
            <span>
              {selectedUser}
              <button
                onClick={(e) => {
                  handleDeleteSelectedUser(e);
                }}
              >
                X
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="row-span-4 col-span-2 bg-blue-300 overflow-y-auto overflow-x-hidden">
        {" "}
        {messages.map(
          //kinopya ko lang
          (msg, index) => (
            <div
              className={`${
                msg.sender.id === 1380 ? "text-right" : "text-left"
              }`}
            >
              <span className="bg-blue-500 rounded-lg">{msg.body} </span>
              <span className="text-xs">from {msg.sender.email}</span>
            </div>
          )
        )}
      </div>
      <div className="row-span-1 col-span-2 bg-blue-500 flex flex-row">
        <div className="w-11/12 flex justify-center items-center">
          <textarea
            className="w-11/12"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>{" "}
        </div>
        <div className="flex items-center justify-center w-1/12">
          <button className="bg-red-500" onClick={(e) => handleSend(e)}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BodyDirectMessage;
