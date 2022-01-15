import React, { createContext, useContext, useReducer, useEffect } from "react";

const initialState = {
  login: null,
  user: {},
  headers: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        login: true,
        headers: action.payload.headers,
        user: action.payload.user,
      };
    case "LOGOUT":
      return initialState;
    default:
      return initialState;
  }
};
const AuthContext = React.createContext();
function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
