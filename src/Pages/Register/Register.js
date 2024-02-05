import React from "react";
import "./Register.css";
import logo1 from "../../Components/Assets/Loogin-girl.svg";

const Register = () => {
  return (
    <div className="Register_Container">
      <img src={logo1} />
      <div className="Right_Container">
        <div className="Register_Content">
          <h1>Register Now !</h1>
          <form className="Register_Form">
            <div class="form-control-input_register">
              <input
                type="text"
                name="fisrt_lastName"
                id="fisrt_lastName"
                required="required"
              />
              <span className="label">First Last Name</span>
            </div>
            <div class="form-control-input">
              <input type="text" name="Email" id="Email" required="required" />
              <span className="label">Email</span>
            </div>
            <div class="form-control-input">
              <input
                type="password"
                name="password"
                id="password"
                required="required"
              />
              <span className="label">password</span>
            </div>
            <div class="form-control-input">
              <input
                type="Confirm_password"
                name="Confirm_password"
                id="Confirm_password"
                required="required"
              />
              <span className="label">Confirm Password</span>
            </div>
            <button type="submit" class="btn">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
