import React, { useEffect, useState } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import ReactSelect from "react-select";
import { images } from "../src/Api/Images";
import Geocode from "react-geocode";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { api } from "./services/apiSvc";
import notificationSvc from "./services/notificationSvc";
import {
  EmailAuthProvider,
  getAuth,
  linkWithCredential,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { firebaseConfig } from "./firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import { OtpModal } from "./services/OtpModal";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "./services/modal";

const WorkShopRegistor = () => {
  const types = [
    "Motor car workshop",
    "Motor bike workshop",
    "Tractor workshop",
    "Heavy Troller workshop",
    "Tyre punchture",
  ];
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [shopType, setShopType] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmedPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [picture, setPicture] = useState("");
  const [show, setShow] = useState(false);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [responseData, setResponseData] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  initializeApp(firebaseConfig);

  useEffect(() => {
    if (window.captchaVerifier) {
      window.verifier.clear();
    }
  }, []);

  const handleLocation = (e) => {
    Geocode.setApiKey("AIzaSyDGheosqin8IXJ_rMczxWeWe20o99nx1KQ");
    setAddress(e);
    Geocode.setLanguage("en");
    Geocode.setRegion("");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    Geocode.fromAddress(e).then((response) => {
      const address = response.results[0].geometry.location;
      setLat(address.lat);
      setLong(address.lng);
    });
  };

  const uploadFile = async (e) => {
    const formdata = new FormData();
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      formdata.append("avatar", e.target.files[0]);
      const response = await api.post("/upload-avatar", formdata);
      setPicture(response.data.data.path);
    } else {
      notificationSvc.error("Please upload a valid image");
    }
  };

  const sendOtpVerification = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      if (!picture || !shopType) {
        notificationSvc.error("All fields are required");
      } else {
        setShowLoader(true);
        const auth = getAuth();
        if (!window.captchaVerifier || window.captchaVerifier?.destroyed) {
          window.captchaVerifier = new RecaptchaVerifier(
            "signIn",
            {
              size: "invisible",
              callback: () => {},
            },
            auth
          );
        }
        window.captchaVerifier.verify();
        SignUpWithEmail();
      }
    } else {
      notificationSvc.error("Password does not match");
    }
  };

  const SignUpWithEmail = () => {
    setShowLoader(true);
    const auth = getAuth();
    const appVerifier = window.captchaVerifier;
    signInWithPhoneNumber(auth, number, appVerifier)
      .then((confirmationResult) => {
        setResponseData(confirmationResult);
        setShowLoader(false);
        window.confirmationResult = confirmationResult;
        handleShow();
      })
      .catch((error) => {
        setShowLoader(false);
        showError(error);
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
            api.post("/role", { role: "Workshop" }).then((data) => {
              api.post("/workshop/register", {
                name: name,
                email: email,
                mobile: number,
                address: address,
                latitude: lat,
                longitude: long,
                type: shopType,
                imageUrl: picture,
              });
              updateProfile(auth.currentUser, {
                displayName: name,
              });
              notificationSvc.success(
                "Email " + email + " Registered Successfully"
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

  return (
    <>
      {showLoader && <LoaderSpinner />}
      <div className="bg">
        <section className="center-section">
          <div className="registor">
            <div className="logo-div translate-logo">
              <img src={images.logo} alt="" className="logo" />
            </div>
            <h1 className="heading">Workshop registration</h1>
            <form>
              <div className="form-group">
                <label htmlFor="shopNameInput">Workshop name </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="shopNameInput"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <label htmlFor="address">Exact address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => handleLocation(e.target.value)}
                  className="form-control"
                  id="address"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Shop type</label>
                <ReactSelect
                  options={types.map((type) => {
                    return { label: type, value: type };
                  })}
                  value={{ label: shopType, value: shopType }}
                  onChange={(e) => setShopType(e.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="img">Select picture for workshop</label>
                <input
                  type="file"
                  id="img"
                  onChange={(e) => uploadFile(e)}
                  name="img"
                  accept="image/*"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                onClick={(e) => sendOtpVerification(e)}
                id="signIn"
                className="btn btn-primary btn-block btn-class"
              >
                Registor as Workshop{" "}
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
export default WorkShopRegistor;
