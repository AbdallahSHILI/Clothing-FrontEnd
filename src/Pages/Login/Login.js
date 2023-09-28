import React from "react";
import "./Login.css";
import { Container } from "../../Components/Index";

const Login = () => {
  return (
    <>
      <Container>
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
              <span>First Name</span>
            </div>

            <div class="form-control-input">
              <input
                type="password"
                name="username"
                id="username"
                required="required"
              />
              <span>Mot de pass</span>
            </div>

            <button type="submit" class="btn">
              Login
            </button>
          </form>
        </main>
      </Container>
    </>
  );
};

export default Login;
