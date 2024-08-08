import React, { useState } from "react";
import "./Login.css";
import logo1 from "../../Components/Assets/Loogin-girl.svg";
import { Link } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const API = "http://localhost:3001";
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(`${API}/Clothing/Users/Login`, {
        Email,
        Password,
      });
      Cookies.set("access-token", response.data.token);
      Cookies.set("user-role", response.data.user.Role); // Store the role in cookies
      window.localStorage.setItem("userId", response.data.user._id);
      // Hide the message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
      navigate("/");
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error("Login failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(`Login Failed: ${error.response.data.message}`);
      } else {
        setMessage("Email or Password is incorrect.");
      }
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <LoginForm
      Email={Email}
      setEmail={setEmail}
      Password={Password}
      setPassword={setPassword}
      message={message}
      setMessage={setMessage}
      onSubmit={onSubmit}
    />
  );
};

const LoginForm = ({
  Email,
  setEmail,
  Password,
  setPassword,
  message,
  onSubmit,
}) => {
  return (
    <div className="Login-container">
      <img src={logo1} alt="Login Illustration" />
      <div className="right-container">
        <div className="login-content">
          <h1>Login Now!</h1>
          <div className="border-content">
            <form className="Login-form" onSubmit={onSubmit}>
              <div className="form-control-input">
                <input
                  type="text"
                  name="Email"
                  id="Email"
                  required
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
                  required
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="label">Mot de passe</span>
              </div>
              <button type="submit" className="btn">
                Login
              </button>
              {message && (
                <div className={`Login_Message ${message && "fadeIn"}`}>
                  {message}
                </div>
              )}
              <p>
                New To Clothing? <Link to="/Register">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
