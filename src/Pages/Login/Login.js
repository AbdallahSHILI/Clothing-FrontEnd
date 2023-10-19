import React from "react";
import "./Login.css";
import { Container } from "../../Components/Index";

const Login = () => {
  return (
    <div className="login-container">
      <header class="join-header">
        <h1>Login Now !</h1>
      </header>
      <main class="join-main">
        <form action="chat.html">
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
      </main>
    </div>
  );
};

export default Login;
