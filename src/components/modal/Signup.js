import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
function SignUp({ modalIsOpen, setModalIsOpen }) {
  const [OTP, setOTP] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [OTPs, setOTPs] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    const res = await axios.post("http://localhost:8080/signup", formData);
    if (res.status === 201) {
      alert("Signup successfull");
    } else {
      console.log("Fail");
    }
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
  const handleSendOTP = async () => {
    const res = await axios.post(`http://localhost:8080/sendOTP`, {
      email: formData.emailId,
    });
    if (res.status === 201) {
      setOTP(1);
    } else {
      handleSendOTP();
    }
  };
  const verifyOTP = async () => {
    const res = await axios.post("http://localhost:8080/verifyOTP", {
      email: formData.emailId,
      OTP: OTPs,
    });
    if (res.status === 201) {
      setOTP(2);
    }
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              name="name"
              type="string"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleFormChange(e)}
            />
          </label>
          <label>
            <input
              name="emailId"
              type="string"
              placeholder="Email"
              value={formData.emailId}
              onChange={(e) => handleFormChange(e)}
            />
          </label>
          <div className="verifyOTP">
            {OTP === 0 && <p onClick={handleSendOTP}>Send OTP</p>}
            {OTP === 1 && (
              <>
                <input
                  type="password"
                  placeholder="Entry OTP"
                  onChange={(e) => setOTPs(e.target.value)}
                />
                <div>
                  <p onClick={handleSendOTP}>Send OTP</p>
                  <p onClick={verifyOTP}>Verify OTP</p>
                </div>
              </>
            )}
            {OTP === 2 && <p style={{ color: "Green" }}>OTP Accepted</p>}
          </div>
          <label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleFormChange(e)}
            />
          </label>
          <label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Comfirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleFormChange(e)}
            />
          </label>
          <label>
            <input
              name="phoneNumber"
              type="string"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => handleFormChange(e)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </>
  );
}

export default SignUp;
