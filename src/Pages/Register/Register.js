import React from "react";
import "./Register.css";
import { Container } from "../../Components/Index";

const Register = () => {
  return (
    <Container>
      <header class="join-header">
        <h1>Ful Name</h1>
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
            <span>Email</span>
          </div>
          <div class="form-control-input">
            <input
              type="text"
              name="username"
              id="username"
              required="required"
            />
            <span>Phone number</span>
          </div>
          <div class="form-control-input">
            <input
              type="password"
              name="username"
              id="username"
              required="required"
            />
            <span>password</span>
          </div>

          <div class="form-control-input">
            <input
              type="text"
              name="username"
              id="username"
              required="required"
            />
            <span>Confirme Password</span>
          </div>

          <button type="submit" class="btn">
            Login
          </button>
        </form>
      </main>
    </Container>
  );
};

export default Register;
