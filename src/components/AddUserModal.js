import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getUsers } from "../api/slack-api";
import { useAuth } from "../context/AuthContextProvider";

const AddUserModal = ({ closeAddUserModal }) => {
  const { state } = useAuth();
  const [listOfUsers, setListOfUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUser, setFilteredUser] = useState(listOfUsers);

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

  return ReactDOM.createPortal(
    <div className="modalBackGround">
      <div className="card bg-yellow-500 px-20 py-5 w-1/4 h-3/4">
        <div className="title mb-5">
          <h1 className="text-center font-bold">Add New User</h1>
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="search user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <p>{search}</p> */}
        </div>

        <div className="mt-5 mb-5 bg-red-500 w-full h-3/4 overflow-y-auto overflow-x-hidden">
          <div>
            {filteredUser.map((listOfUser) => (
              <div className="hover:text-yellow-500" key={listOfUser.id}>
                {listOfUser.uid}
              </div>
            ))}
          </div>
        </div>

        <div className="footer">
          <button
            className="btn-red dark:bg-gradient-pink"
            onClick={() => closeAddUserModal(false)}
          >
            Close
          </button>
          <button
            className="btn-red dark:bg-gradient-pink"
            // onClick={handleCreateChannel}
          >
            Add
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
export default AddUserModal;
