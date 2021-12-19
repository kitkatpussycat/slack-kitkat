import React from "react";
import { useAuth } from "./AuthContextProvider";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  const { state } = useAuth();
  if (!state.login) {
    return <Navigate to="/" />;
  }
  return props.children;
}

export default ProtectedRoute;
