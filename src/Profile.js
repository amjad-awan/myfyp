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

const WorksopProfile = () => {
  const types = [
    "Motor car workshop",
    "Motor bike workshop",
    "Tractor workshop",
    "Heavy Troller workshop",
    "Tyre punchture",
  ];
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [shopType, setShopType] = useState("");
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  initializeApp(firebaseConfig);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    getWorkshop();
    if (user) {
      setName(user?.name);
      setPicture(user?.photo);
    }
  }, []);

  const getWorkshop = async () => {
    const response = await api.get("/workshop");
    if (response && response.ok) {
      setAddress(response.data.address);
      setLat(response.data.latitude);
      setLong(response.data.longitude);
      setShopType(response.data.type);
    }
  };

  const handleLocation = (e) => {
    Geocode.setApiKey("AIzaSyB7R4wPyILvLMpGIN8zOCAA52oSPpLdLWQ");
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

  const updateWorkshopProfile = async (e) => {
    e.preventDefault();
    if (!picture) {
      return notificationSvc.error("Please Select Picture");
    }
    if (!shopType) {
      return notificationSvc.error("Please Select Shop Type");
    }
    const response = await api.put("/updateWorkshop", {
      name: name,
      address: address,
      latitude: lat,
      longitude: long,
      type: shopType,
      imageUrl: picture,
    });
    if (response && response.ok) {
      notificationSvc.success("Profile Updated Successfully");
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, name: name, photo: picture })
      );
      updateProfile(getAuth().currentUser, {
        displayName: name,
        photoURL: picture,
      });
      navigate("/");
    }
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

  return (
    <>
      <div className="bg">
        <section className="center-section">
          <div className="registor">
            <div className="logo-div translate-logo">
              <img src={images.logo} alt="" className="logo" />
            </div>
            <h1 className="heading">Workshop Profile</h1>
            <form onSubmit={(e) => updateWorkshopProfile(e)}>
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
              <button
                type="submit"
                id="signIn"
                className="btn btn-primary btn-block btn-class"
              >
                Update Profile <BsArrowRightCircleFill className="arrow-over" />
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};
export default WorksopProfile;
