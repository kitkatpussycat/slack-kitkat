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
        <div className="entry-card h-full rounded-lg flex flex-col items-center py-20 font-semibold">
          <div className="mb-5">
            <h1 className="text-5xl font-bold text-white">Slack</h1>
          </div>
          <div className="w-4/5 flex flex-col items-center">
            <label className="text-white self-start">Your Email</label>
            <input
              className="mb-5 w-full h-10 px-1 bg-slate-800 text-white border-slate-600 border focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              type="email"
              placeholder="example@company.com"
              value={loginAccount.email}
              onChange={(e) =>
                setLoginAccount({ ...loginAccount, email: e.target.value })
              }
            />
          </div>
          {/* <p>{loginAccount.email}</p> */}
          <div className="w-4/5 flex flex-col items-center">
            <label className="text-white self-start">Password</label>
            <input
              className="mb-10 w-full h-10 px-1 bg-slate-800 text-white border-slate-600 border-2 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              type="password"
              placeholder="Password"
              value={loginAccount.password}
              onChange={(e) =>
                setLoginAccount({ ...loginAccount, password: e.target.value })
              }
            />
          </div>
          {/* <p>{loginAccount.password}</p> */}
          <div className="flex justify-center items-center flex-col h-1/3 w-full absolute bottom-0">
            <div className="mb-0">
              <button
                className="bg-green-500 px-20 py-2 w-full font-bold rounded-lg hover:bg-green-700 hover:text-black transition-all"
                onClick={handleLogin}
              >
                Log-in
              </button>
            </div>
            <div>
              <span className="text-white">Not a member? </span>
              <Link
                className="text-blue-400 hover:font-bold hover:underline"
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
