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
  const [selectedUsers, setSelectedUsers] = useState([]);

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
    setSelectedUsers([...selectedUsers, selectedUser]);
    console.log(selectedUsers);
    console.log("nagana ba ito?");
  };

  const handleDeleteAddUser = (e, s) => {
    e.preventDefault();
    setSelectedUsers(selectedUsers.filter((t) => t.id !== s));
  };

  const handleAddMember = async () => {
    if (selectedUsers.length === 0) {
      alert("You need to add a member!");
    } else {
      const status = await addMemberChannel(
        state.headers,
        channelId,
        selectedUsers[0].id
      );
      if (status === 200) {
        alert(`Added ${selectedUsers[0].uid}!`);
      }
    }
  };
  console.log(channelId);
  //   console.log(selectedUsers[0].id);

  return ReactDOM.createPortal(
    <div className="modalBackGround">
      <div className="card bg-blue-900 px-20 py-5 w-screen h-screen lg:w-1/4 lg:h-3/4 relative">
        <div className="title mb-5">
          <h1 className="text-center font-bold">Add New User</h1>
        </div>
        <div className="flex justify-center">
          <input
            className="text-black"
            type="text"
            placeholder="search user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="mt-5 mb-5 bg-spider w-full h-1/2 overflow-y-auto overflow-x-hidden">
          <div>
            {filteredUser.map((listOfUser) => (
              <div
                className="hover:text-yellow-300 cursor-pointer"
                key={listOfUser.id}
                onClick={(e) => handleAddUsers(e, listOfUser)}
              >
                {listOfUser.uid}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 mb-5 bg-slate-500 w-full h-1/4 overflow-y-auto overflow-x-hidden">
          <div>
            {selectedUsers &&
              selectedUsers.map((selectedUser) => (
                <li key={selectedUser.id}>
                  {selectedUser.uid}
                  <button
                    className="btn-red py-0"
                    onClick={(e) => handleDeleteAddUser(e, selectedUser.id)}
                  >
                    delete
                  </button>
                </li>
              ))}
          </div>
        </div>

        <div className="flex justify-around items-center w-full absolute bottom-0 left-0 py-5">
          <button
            className="bg-spider mx-0 px-5"
            onClick={() => closeAddMemberModal(false)}
          >
            Close
          </button>
          <button
            className="bg-spider mx-0 px-5"
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
