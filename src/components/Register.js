import React, { useContext, useState } from "react";
import { ParentContext } from "./Parent";
import { register } from "./slack-api";
import { Link } from "react-router-dom";

const API_URL = "https://slackapi.avionschool.com/api/v1";

function Register() {
  const parentContext = useContext(ParentContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);
  const [flash, setFlash] = useState("");
  const [account, setAccount] = useState({
    email: "",
    password: "",
    // username: "",
    confirmPassword: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const [response, errors] = await register(
      account.email,
      //   account.username,
      account.password,
      account.confirmPassword
    );
    if (errors.length > 0) {
      setError(errors);
    } else {
      console.log("register response", response);
      setFlash("Successful register");
    }
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading ....</p>
      ) : (
        <div>
          <h1>Register</h1>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
          />
          <p>{account.email}</p>
          {/* <input
            type="text"
            placeholder="username"
            onChange={(e) =>
              setAccount({ ...account, username: e.target.value })
            }
          /> */}
          <p>{account.username}</p>
          <input
            type="password"
            placeholder="password"
            onChange={(e) =>
              setAccount({ ...account, password: e.target.value })
            }
          />
          <p>{account.password}</p>
          <input
            type="password"
            placeholder="confirm password"
            onChange={(e) =>
              setAccount({ ...account, confirmPassword: e.target.value })
            }
          />
          <p>{account.confirmPassword}</p>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
      {error.length ? error.map((err) => <p>{err}</p>) : null}
      {flash && <p>{flash}</p>}
      <nav>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
}

export default Register;
