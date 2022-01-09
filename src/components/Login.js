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
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-screen h-screen lg:w-1/5 lg:h-1/2 relative">
        <div className="card h-full rounded-lg flex flex-col items-center py-20">
          <div className="mb-5">
            <h1 className="text-5xl font-bold">Slack</h1>
          </div>
          <input
            className="mb-5 w-4/5 h-10 px-1"
            type="email"
            placeholder="email"
            value={loginAccount.email}
            onChange={(e) =>
              setLoginAccount({ ...loginAccount, email: e.target.value })
            }
          />
          <p>{loginAccount.email}</p>
          <input
            className="mb-10 w-4/5 h-10 px-1"
            type="password"
            placeholder="password"
            value={loginAccount.password}
            onChange={(e) =>
              setLoginAccount({ ...loginAccount, password: e.target.value })
            }
          />
          <p>{loginAccount.password}</p>
          <div className="flex justify-center items-center flex-col h-1/3 w-full absolute bottom-0">
            <div className="mb-0">
              <button
                className="card px-20 py-2 w-full font-bold rounded-lg hover:bg-white hover:text-black transition-all"
                onClick={handleLogin}
              >
                Log-in
              </button>
            </div>
            <div>
              <span>Not a member? </span>
              <Link
                className="text-white hover:font-bold hover:underline"
                to="/register"
              >
                Sign up Now!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
