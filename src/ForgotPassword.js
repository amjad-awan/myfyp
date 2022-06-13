import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiFacebook } from "react-icons/fi";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { images } from "../src/Api/Images";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/firebaseConfig";
import notificationSvc from "./services/notificationSvc";
import LoaderSpinner from "./services/modal";
import { api } from "./services/apiSvc";

const ForgotPassword = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const resetPassword = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    initializeApp(firebaseConfig);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then((response) => {
        notificationSvc.success("Reset email sent successfully");
        setShowLoader(false);
      })
      .catch((err) => {
        showError(err);
        setShowLoader(false);
      });
  };
  const showError = (error) => {
    var errorCode = error.code;
    switch (errorCode) {
      case "auth/email-already-in-use":
        notificationSvc.error("Email already in use by other account");
        break;
      case "auth/invalid-email":
        notificationSvc.error("Invalid Email Address");
        break;
      case "auth/operation-not-allowed":
        notificationSvc.error("Unauthorized to login");
        break;
      case "auth/weak-password":
        notificationSvc.error("Password too short");
        break;
      case "auth/too-many-requests":
        notificationSvc.error("Too many requests to login please wait!!!");
        break;
      case "auth/user-not-found":
        notificationSvc.error("Invalid Email Address");
        break;
      case "auth/invalid-verification-code":
        notificationSvc.error("Invalid Verification Code");
        break;
      default:
        notificationSvc.error("Invalid Credentials");
        break;
    }
  };
  return (
    <>
      {showLoader && <LoaderSpinner />}
      <div className="bg">
        <section className="center-section">
          <div className="registor">
            <div className="logo-div translate-logo">
              <img src={images.logo} alt="" className="logo" />
            </div>
            <h1 className="heading">Login</h1>
            <form onSubmit={(e) => resetPassword(e)}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-class"
              >
                Reset Password <BsArrowRightCircleFill className="arrow-over" />{" "}
              </button>
            </form>
            {/* <div className="or-line">
              <span className="or"> or login with</span>
            </div> */}

            {/* <div className="social-plate-form">
              <span>
                <FcGoogle />
              </span>
              <span>
                <FiFacebook />
              </span>
            </div> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default ForgotPassword;
