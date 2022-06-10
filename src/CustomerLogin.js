import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiFacebook } from "react-icons/fi";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { images } from "../src/Api/Images";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/firebaseConfig";
import notificationSvc from "./services/notificationSvc";
import LoaderSpinner from "./services/modal";
import { api } from "./services/apiSvc";

const CustomerLogin = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const SignIn = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    initializeApp(firebaseConfig);
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);
    if (response && response.user) {
      localStorage.setItem("token", response._tokenResponse.idToken);
      const role = await api.get("/role");
      if (role && role.ok) {
        console.log(role.data);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.user.uid,
            name: response.user.displayName,
            email: response.user.email,
            photo: response.user.photoURL,
            role: role.data.role,
          })
        );
        onLogin();
        localStorage.setItem("phoneNumber", response.user.phoneNumber);
        notificationSvc.success("Successfully logged in");
        navigate("/");
      }
    } else {
      // showError(resp);
      notificationSvc.error("Invalid credentials");
      setShowLoader(false);
    }
    // .then((response) => {
    //   localStorage.setItem("token", response._tokenResponse.idToken);
    //   api
    //     .get("/role")
    //     .then((data) => {
    //
    //     .catch((error) => {
    //       console.log(error);
    //       notificationSvc.error("Failed to login");
    //     });
    // })
    // .catch((error) => {
    //
    // });
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
      case "auth/invalid-phone-number":
        notificationSvc.error("Invalid Phone Number");
        break;
      case "auth/invalid-verification-code":
        notificationSvc.error("Invalid Verification Code");
        break;
      default:
        notificationSvc.error("An error occurred while login");
        break;
    }
  };
  return (
    <>
      {/* {showLoader && <LoaderSpinner />} */}
      <div className="bg">
        <section className="center-section">
          <div className="registor">
            <div className="logo-div translate-logo">
              <img src={images.logo} alt="" className="logo" />
            </div>
            <h1 className="heading">customer Login</h1>
            <form onSubmit={(e) => SignIn(e)}>
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
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-class"
              >
                Login in <BsArrowRightCircleFill className="arrow-over" />{" "}
              </button>
            </form>
            <Link to="/CustomerRegister" className="no-account-link">
              if didn't registor yet, click here to registor
            </Link>
            {/* <div className="or-line">
              <span className="or"> or login with</span>
            </div>

            <div className="social-plate-form">
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

export default CustomerLogin;
