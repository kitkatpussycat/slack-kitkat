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
          <div className="card h-full">
            <div className="mb-5 py-10">
              <h1 className="text-5xl font-bold text-black">Slack</h1>
            </div>
            <div>
              <input
                className="mb-5 w-4/5 h-10 px-1"
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
                className="mb-5 w-4/5 h-10 px-1"
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
                className="mb-5 w-4/5 h-10 px-1"
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
              <button
                className="card px-5 py-2 w-4/5 hover:bg-white hover:text-black transition-all"
                onClick={handleRegister}
              >
                Sign up
              </button>
            </div>
            <div className="absolute bottom-0 w-full hover:bg-white hover:text-black">
              {error.length ? error.map((err) => <p>{err}</p>) : null}
              {flash && <p>{flash}</p>}
              <span>Back to </span>
              <Link className="text-white hover:text-black" to="/">
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
