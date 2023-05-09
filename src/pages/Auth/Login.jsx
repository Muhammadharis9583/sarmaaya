import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import "./Login.css";

const Login = () => {
  const [accessId, setAccessId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:3001/users/?id=" + accessId);

      const data = await res.data;
      // check if user exists
      if (data.length) {
        // store user data in session storage
        sessionStorage.setItem("user", JSON.stringify(data[0]));
        console.log(data);

        // redirect to symbols page
        window.location.href = "/symbols";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center m-5">
      <form onSubmit={handleSubmit}>
        <div className="card" style={{ width: "350px" }}>
          <div className="p-3 m-auto">
            <img
              src="sarmaayaNav.jpg"
              alt="Sarmaya logo"
              className="img-fluid"
              style={{ width: "150px", objectFit: "contain" }}
            />
          </div>
          <div className="back-btn text-center mb-3">
            <a href="https://sarmaaya.pk/" className="badge bg-secondary ">
              Back to Portal
            </a>
          </div>
          <div className="input-group flex-nowrap px-3 my-1 ">
            <span className="input-group-text" id="addon-wrapping">
              <FontAwesomeIcon icon="fa-regular fa-user" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Access ID"
              aria-label="accessId"
              aria-describedby="addon-wrapping"
              onChange={(e) => setAccessId(e.target.value)}
            />
          </div>
          <div className="input-group flex-nowrap px-3 my-1">
            <span className="input-group-text" id="addon-wrapping">
              <FontAwesomeIcon icon="fa-solid fa-key" />
            </span>
            <input
              type="password"
              className="form-control outline-0"
              placeholder="password"
              aria-label="password"
              aria-describedby="addon-wrapping"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center signin-link-text my-4">
            <p className="mb-1">
              Having issues logging in?{" "}
              <a href="./forgot">
                <span style={{ color: "#6ce606" }}>Reset your password.</span>
              </a>{" "}
            </p>
            <p className="">
              Don&apos;t have account,{" "}
              <a href="./signup">
                <span style={{ color: "#6ce606" }}>Signup now.</span>
              </a>
            </p>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-warning text-light btn-block sign-in-btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
