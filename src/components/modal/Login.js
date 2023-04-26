import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { UserContext } from "../contexts/userContext";

function Login({ modalIsOpen, setModalIsOpen }) {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });
  const [error, setError] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8080/login", formData);
    console.log(res);
    if (res.data.toekn) {
      localStorage.setItem("jwt", res.data.token);
      const userId = JSON.parse(atob(res.data.token.split(".")[1])).id;
      setUser(userId);
      setModalIsOpen(false);
      setFormData({
        emailId: "",
        password: "",
      });
      setError("");
    } else {
      setError(res.data.err);
    }
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "50%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "50px",
    },
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="emailId"
            type="email"
            placeholder="Email"
            value={formData.emailId}
            onChange={(e) => handleFormChange(e)}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleFormChange(e)}
          />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
        {error && <div className="error">{error}</div>}
      </Modal>
    </>
  );
}

export default Login;
