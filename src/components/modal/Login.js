import React, { useState } from "react";
import Modal from "react-modal";

function Login({ modalIsOpen, setModalIsOpen }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
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
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleFormChange(e)}
            />
          </label>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleFormChange(e)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </>
  );
}

export default Login;
