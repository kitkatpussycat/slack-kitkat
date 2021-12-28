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
      <div className="w-screen h-screen lg:w-1/5 lg:h-1/2 box-shadow relative">
        <div className="card rounded-full h-full">
          <div className="mb-5 py-10">
            <h1 className="text-5xl font-bold">Slack</h1>
          </div>
          <input
            className="mb-5 w-4/5 h-10 bg-slate-200 px-1 text-red-900"
            type="email"
            placeholder="email"
            value={loginAccount.email}
            onChange={(e) =>
              setLoginAccount({ ...loginAccount, email: e.target.value })
            }
          />
          <p>{loginAccount.email}</p>
          <input
            className="mb-10 w-4/5 h-10 bg-slate-200 px-1 text-blue-800"
            type="password"
            placeholder="password"
            value={loginAccount.password}
            onChange={(e) =>
              setLoginAccount({ ...loginAccount, password: e.target.value })
            }
          />
          <p>{loginAccount.password}</p>
          <div className="flex justify-center flex-col h-1/3 w-full absolute bottom-0">
            <div className="mb-0">
              <button
                className="bg-pink-600 px-5 py-2 w-4/5 rounded-lg"
                onClick={handleLogin}
              >
                Log-in
              </button>
            </div>
            <div>
              <span>Not a member? </span>
              <Link className="text-blue-100 hover:bg-pink-600" to="/register">
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
