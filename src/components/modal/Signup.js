import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { UserContext } from "../contexts/userContext";

function SignUp({ modalIsOpen, setModalIsOpen }) {
  const { setUser } = useContext(UserContext);
  const [OTP, setOTP] = useState(0);
  const [error, setError] = useState({
    name: false,
    emailId: false,
    password: false,
    confirmPassword: false,
    phoneNumber: false,
    otp: false,
  });
  useEffect(() => console.log(error), [error]);
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
    let obj = error;
    for (let i in formData) {
      if (typeof formData[i] === "string" && formData[i].trim() === "") {
        console.log("hi");
        setError((prev) => ({ ...prev, [i]: true }));
      }
    }
    if (OTP === 2) {
      formData.optVerified = 1;
    } else {
      formData.optVerified = 0;
      setError((prev) => ({ ...prev, otp: true }));
    }
    const res = await axios.post("http://localhost:8080/signup", formData);
    if (res.status === 201) {
      localStorage.setItem("jwt", res.data.token);
      const userId = JSON.parse(atob(res.data.token.split(".")[1])).id;
      setUser(userId);
      alert("Signup successfull");
    } else {
      console.log("Fail");
    }
    setFormData({
      name: "",
      emailId: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    });
    setOTP(0);
    setOTPs();
    setModalIsOpen(false);
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "25%",
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
              style={{ borderColor: error.name === true ? "red" : "green" }}
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
