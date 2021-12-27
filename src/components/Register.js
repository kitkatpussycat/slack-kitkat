import React, { useState } from "react";
import { register } from "../api/slack-api";
import { Link } from "react-router-dom";

const API_URL = "https://slackapi.avionschool.com/api/v1";

function Register() {
  const [registerAccount, setRegisterAccount] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [flash, setFlash] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const [response, errors] = await register(
      registerAccount.email,
      registerAccount.password,
      registerAccount.confirmPassword
    );
    if (errors.length > 0) {
      setError(errors);
    } else {
      setFlash("Successful register");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {/* <div> */}
      {loading ? (
        <p>Loading ....</p>
      ) : (
        <div className="w-screen h-screen lg:w-1/5 lg:h-1/2 box-shadow relative">
          <div className="bg-spider h-full">
            <div className="mb-5 py-10">
              <h1 className="text-5xl font-bold text-black">Slack</h1>
            </div>
            <div>
              <input
                className="mb-5 w-4/5 h-10 bg-slate-200 px-1 text-red-800"
                type="email"
                placeholder="email"
                value={registerAccount.email}
                onChange={(e) =>
                  setRegisterAccount({
                    ...registerAccount,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                className="mb-5 w-4/5 h-10 bg-slate-200 px-1 text-blue-900"
                type="password"
                value={registerAccount.password}
                placeholder="password"
                onChange={(e) =>
                  setRegisterAccount({
                    ...registerAccount,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                className="mb-5 w-4/5 h-10 bg-slate-200 px-1 text-blue-900"
                type="password"
                placeholder="confirm password"
                value={registerAccount.confirmPassword}
                onChange={(e) =>
                  setRegisterAccount({
                    ...registerAccount,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-10">
              <button className="btn-gradient w-4/5" onClick={handleRegister}>
                Sign up
              </button>
            </div>
            <div className="absolute bottom-0 w-full hover:bg-blue-900">
              {error.length ? error.map((err) => <p>{err}</p>) : null}
              {flash && <p>{flash}</p>}
              <span>Back to </span>
              <Link className="text-blue-500" to="/">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* {error.length ? error.map((err) => <p>{err}</p>) : null}
      {flash && <p>{flash}</p>}
      <Link to="/">Login</Link> */}
      {/* </div> */}
    </div>
  );
}

export default Register;
