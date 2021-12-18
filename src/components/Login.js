import React, { useState } from "react";
import axios from "axios";
import { login } from "./slack-api";
import { Link } from "react-router-dom";

function Login() {
  const [accountLogin, setAccountLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState([]);
  const [flash, setFlash] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const [response, errors] = await login(
      accountLogin.email,
      accountLogin.password
    );
    if (errors.length > 0) {
      setError(errors);
    } else {
      console.log("login response", response);
      setFlash("Successful login");
    }
  };

  return (
    <div>
      <h1>Log-in</h1>
      <input
        type="email"
        placeholder="email"
        onChange={(e) =>
          setAccountLogin({ ...accountLogin, email: e.target.value })
        }
      />
      <p>{accountLogin.email}</p>
      <input
        type="password"
        placeholder="password"
        onChange={(e) =>
          setAccountLogin({ ...accountLogin, password: e.target.value })
        }
      />
      <nav>
        don't have an account yet? <Link to="/register">create account</Link>
      </nav>
      {error.lg}
      <button onClick={handleLogin}>LogIn</button>
    </div>
  );
}

export default Login;
