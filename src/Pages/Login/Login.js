import React, { useState } from "react";
import "./Login.css";
import logo1 from "../../Components/Assets/Loogin-girl.svg";
import { useCookies } from "react-cookie";
import Axios from "axios";

const AuthLogin = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["acces-token"]);
  const API = "http://localhost:3001";

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(`${API}/Clothing/Users/Login`, {
        Email,
        Password,
      });
      setCookies("acces-token", response.data.token);
      window.localStorage.setItem("userId", response.data.user._id);
      window.location.reload(false);
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <LoginForm
      Email={Email}
      setEmail={setEmail}
      Password={Password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
};
const LoginForm = ({ Email, setEmail, Password, setPassword, onSubmit }) => {
  return (
    <div className="Login-container">
      <img src={logo1} />
      <div className="right-container">
        <div className="login-content">
          <h1>Login Now !</h1>
          <form className="Login-form" onSubmit={onSubmit}>
            <div className="form-control-input">
              <input
                type="text"
                name="Email"
                id="Email"
                required="required"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="label">Email</span>
            </div>
            <div className="form-control-input">
              <input
                type="password"
                name="Password"
                id="Password"
                required="required"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="label">Mot de pass</span>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
