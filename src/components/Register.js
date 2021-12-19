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
    <div>
      {loading ? (
        <p>Loading ....</p>
      ) : (
        <div>
          <h1>Register</h1>
          <div>
            <input
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
          <button onClick={handleRegister}>register</button>
        </div>
      )}
      {error.length ? error.map((err) => <p>{err}</p>) : null}
      {flash && <p>{flash}</p>}
      <Link to="/">Login</Link>
    </div>
  );
}

export default Register;
