import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getUsers } from "../api/slack-api";
import { useAuth } from "../context/AuthContextProvider";
import { addMemberChannel } from "../api/slack-api";

const AddMemberModal = ({ closeAddMemberModal, channelId }) => {
  const { state } = useAuth();
  const [listOfUsers, setListOfUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUser, setFilteredUser] = useState(listOfUsers);
  const [selectedUsers, setSelectedUsers] = useState({});

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

  const handleAddUsers = (e, selectedUser) => {
    e.preventDefault();
    setSelectedUsers({ selectedUser });
    console.log(selectedUsers);
    console.log(selectedUsers.uid);
    console.log("nagana ba ito?");
  };

  // const handleDeleteAddUser = (e, s) => {
  //   e.preventDefault();
  //   setSelectedUsers(selectedUsers.filter((t) => t.id !== s));
  // };

  const handleAddMember = async () => {
    if (selectedUsers.length === 0) {
      alert("You need to add a member!");
    } else {
      const status = await addMemberChannel(
        state.headers,
        channelId,
        selectedUsers.selectedUser.id
      );
      if (status === 200) {
        alert(`Added ${selectedUsers.selectedUser.uid}!`);
      }
    }
  };
  console.log(channelId);
  //   console.log(selectedUsers[0].id);

  return ReactDOM.createPortal(
    <div className="modalBackGround">
      <div className="bg-modal px-10 py-5 w-screen h-screen lg:w-1/4 lg:h-1/2 relative xs:text-xs sm:text-sm md:text-md lg:text-lg rounded-xl">
        <div className="title mb-5">
          <h1 className="text-center font-bold">
            Add New Member to {state.headers.uid}
          </h1>
        </div>
        <div className="flex justify-center">
          <input
            className="text-black p-2 w-5/6"
            type="text"
            placeholder="search user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mt-5 mb-5 card w-full h-1/3 overflow-y-auto overflow-x-hidden rounded-xl">
          <div>
            {filteredUser.map((listOfUser) => (
              <div
                className="hover:bg-blue-900 transition-all cursor-pointer"
                key={listOfUser.id}
                onClick={(e) => handleAddUsers(e, listOfUser)}
              >
                {listOfUser.uid}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 mb-5 card w-full h-1/5 overflow-y-auto overflow-x-hidden rounded-xl text-center">
          <div>
            {Object.keys(selectedUsers).length === 0 ? (
              <div></div>
            ) : (
              selectedUsers.selectedUser.uid
            )}
            {/* <button
              className="btn-red py-0 hover:bg-red-900"
              onClick={(e) => handleDeleteAddUser(e, selectedUsers.id)}
            >
              X
            </button> */}
          </div>
        </div>

        <div className="flex justify-center items-center w-full absolute bottom-0 left-0 py-5">
          <button
            className="card mx-2 px-5 hover:bg-blue-900 transition-all"
            onClick={() => closeAddMemberModal(false)}
          >
            Close
          </button>
          <button
            className="card mx-2 px-5 hover:bg-blue-900 transition-all"
            onClick={(e) => handleAddMember(selectedUsers.id)}
          >
            Add
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default AddMemberModal;
