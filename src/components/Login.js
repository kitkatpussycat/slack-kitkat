import React, { useState } from "react";
import { login } from "../api/slack-api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

function Login() {
  const [loginAccount, setLoginAccount] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState([]);
  const { dispatch } = useAuth();

  const handleLogin = async () => {
    const { data, errors, headers } = await login(
      loginAccount.email,
      loginAccount.password
    );
    if (errors.length > 0) {
      console.log(errors);
      setError(errors);
    } else {
      console.log("login response", data);
      dispatch({
        type: "LOGIN",
        payload: { headers: headers, user: data },
      });
    }
  };
  return (
    <div>
      <h1>Log-in</h1>
      <input
        type="email"
        placeholder="email"
        value={loginAccount.email}
        onChange={(e) =>
          setLoginAccount({ ...loginAccount, email: e.target.value })
        }
      />
      <p>{loginAccount.email}</p>
      <input
        type="password"
        placeholder="password"
        value={loginAccount.password}
        onChange={(e) =>
          setLoginAccount({ ...loginAccount, password: e.target.value })
        }
      />
      <p>{loginAccount.password}</p>
      <button onClick={handleLogin}>Log-in</button>
      <Link to="/register">Create Account</Link>
    </div>
  );
}

export default Login;
