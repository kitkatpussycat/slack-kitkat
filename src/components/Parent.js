import React, { useState, createContext, useReducer } from "react";
import Register from "../components/Register";
import Login from "../components/Login";

export const ParentContext = React.createContext();

const initialState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    default:
      return { initialState };
  }
};
function Parent() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ParentContext.Provider
      value={{ parentState: state, parentDispatch: dispatch }}
    >
      {/* <Register /> */}
      <Login />
    </ParentContext.Provider>
  );
}

export default Parent;
