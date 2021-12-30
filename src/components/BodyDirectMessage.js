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
    <div className=" h-screen grid grid-rows-6 grid-flow-col gap-4 px-0 py-3 mx-2 my-1">
      <div className="row-span-1 col-span-2 card flex justify-start lg:text-xl">
        <div>
          <input
            className="w-full text-black"
            type="text"
            placeholder="search user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <p>{search}</p> */}
          {search === "" ? (
            <div></div>
          ) : (
            <div className="mt-5 mb-5 card w-full h-1/2 overflow-y-auto overflow-x-hidden">
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
            <span className="lg:text-xl font-bold">
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
                className={`leading-14 text-black ${
                  msg.sender.id === state.user.id ? "text-right" : "text-left"
                }`}
              >
                {/* <span className="text-xs text-slate-300">
                  {msg.sender.email}
                </span>{" "}
                <br /> */}
                <span className="card rounded-lg py-1 px-1 mx-3 lg:text-xl">
                  {msg.body}{" "}
                </span>
              </div>
            )
          )
        )}
      </div>
      <div className="row-span-1 col-span-2 card flex flex-row">
        <div className="w-full lg:w-full flex justify-center items-center">
          <textarea
            className="w-11/12 lg:w-11/12 h-1/2 text-black mx-1"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>{" "}
          <button
            className="btn-gradient px-0 py-0 text-xs mx-0 lg:font-bold lg:text-lg"
            onClick={(e) => handleSend(e)}
          >
            Send
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
