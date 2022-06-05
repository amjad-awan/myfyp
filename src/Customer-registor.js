import React, { useEffect, useState } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import "react-phone-number-input/style.css";
import {
  EmailAuthProvider,
  getAuth,
  linkWithCredential,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import PhoneInput from "react-phone-number-input";
import { images } from "./Api/Images";
import notificationSvc from "./services/notificationSvc";
import { firebaseConfig } from "./firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { OtpModal } from "./services/OtpModal";
import LoaderSpinner from "./services/modal";
import { api } from "./services/apiSvc";
const Customerregistor = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [show, setShow] = useState(true);
  const [responseData, setResponseData] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  initializeApp(firebaseConfig);

  useEffect(() => {
    if (window.verifier) {
      window.verifier.clear();
    }
  }, []);

  const SignUpWithEmail = () => {
    setShowLoader(true);
    const auth = getAuth();
    const appVerifier = window.verifier;
    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        setResponseData(confirmationResult);
        setShowLoader(false);
        window.confirmationResult = confirmationResult;
        handleShow();
      })
      .catch((error) => {
        console.log(error);
        setShowLoader(false);
        showError(error);
      });
  };

  const sendOtpVerification = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    const auth = getAuth();
    if (!window.verifier || window.verifier?.destroyed) {
      window.verifier = new RecaptchaVerifier(
        "signIn",
        {
          size: "invisible",
          callback: () => {},
        },
        auth
      );
    }
    window.verifier.verify();
    SignUpWithEmail();
  };

  const verifyCode = (code) => {
    setShowLoader(true);
    responseData
      .confirm(code)
      .then((response) => {
        var auth = getAuth();
        const credentials = EmailAuthProvider.credential(email, password);
        linkWithCredential(auth.currentUser, credentials)
          .then((response) => {
            localStorage.setItem("token", response._tokenResponse.idToken);
            api.post("/role", { role: "Customer" }).then((data) => {
              updateProfile(auth.currentUser, {
                displayName: name,
              });
              notificationSvc.success(
                "Email Verification Sent To " + email + " Successfully"
              );
              setShowLoader(false);
              navigate("/");
              handleClose();
            });
          })
          .catch((error) => {
            console.error(error);
            setShowLoader(false);
            showError(error);
            handleClose();
          });
      })
      .catch((error) => {
        console.error(error);
        setShowLoader(false);
        showError(error);
        handleClose();
      });
  };

  const showError = (error) => {
    var errorCode = error.code;
    switch (errorCode) {
      case "auth/email-already-in-use":
        notificationSvc.error("Email already in use by other account");
        break;
      case "auth/code-expired":
        notificationSvc.error("Code expired please verify captcha again");
        break;
      case "auth/invalid-phone-number":
        notificationSvc.error("Invalid Phone Number");
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
      {showLoader && <LoaderSpinner />}
      <div className="bg">
        <section className="center-section">
          <div className="registor">
            <div className="logo-div translate-logo">
              <img src={images.logo} alt="" className="logo" />
            </div>
            <h1 className="heading">Customer registration</h1>
            <form>
              <div className="form-group">
                <label htmlFor="nameInput">Name </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="nameInput"
                  aria-describedby="emailHelp"
                />
              </div>
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
                <label htmlFor="phoneNo">Mobile No</label>
                <PhoneInput
                  international
                  defaultCountry="PK"
                  className="form-control"
                  placeholder="Enter phone number"
                  rules={{ required: true }}
                  limitMaxLength
                  value={number}
                  onChange={(e) => setNumber(e)}
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
              <div className="mt-3 mb-3" id="recaptcha-container"></div>
              <button
                type="submit"
                onClick={(e) => sendOtpVerification(e)}
                id="signIn"
                className="btn btn-primary btn-block btn-class"
              >
                Registor as customer{" "}
                <BsArrowRightCircleFill className="arrow-over" />
              </button>
            </form>
          </div>
        </section>
      </div>
      <OtpModal show={show} handleClose={handleClose} onVerify={verifyCode} />
    </>
  );
};

export default Customerregistor;
