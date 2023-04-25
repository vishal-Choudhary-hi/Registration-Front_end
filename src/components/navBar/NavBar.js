import React, { useState } from "react";
import Modal from "react-modal";
import SignUp from "../modal/Signup";
import Login from "../modal/Login";
import "./NavBar.css";
import logo from "../../Images/logo.png";
Modal.setAppElement("#root");
function NavBar() {
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  let user = 1;
  return (
    <>
      <div className="navBar">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h2>Dev Site</h2>
        </div>
        <div className="menu">
          {user ? (
            <>
              <p onClick={() => setSignupModal(true)}>Signup</p>
              <p onClick={() => setLoginModal(true)}>Login</p>
            </>
          ) : (
            <>
              <p>Account</p>
              <p>Logout</p>
            </>
          )}
        </div>
      </div>
      <div style={{ width: "50%", margin: "auto" }}>
        <SignUp modalIsOpen={signupModal} setModalIsOpen={setSignupModal} />
        <Login modalIsOpen={loginModal} setModalIsOpen={setLoginModal} />
      </div>
    </>
  );
}

export default NavBar;
