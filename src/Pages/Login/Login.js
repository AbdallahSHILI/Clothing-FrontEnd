import React from "react";
import "./Login.css";
import logo1 from "../../Components/Assets/Loogin-girl.svg";

const Login = () => {
  return (
    <div className="Login-container">
      <img src={logo1} />
      <div className="right-container">
        <div className="login-content">
          <h1>Login Now !</h1>
          <form className="Login-form">
            <div class="form-control-input">
              <input
                type="text"
                name="username"
                id="username"
                required="required"
              />
              <span className="label">First Name</span>
            </div>
            <div class="form-control-input">
              <input
                type="password"
                name="password"
                id="password"
                required="required"
              />
              <span className="label">Mot de pass</span>
            </div>
            <button type="submit" class="btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
