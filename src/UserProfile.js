import React, { useEffect, useState } from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { images } from "../src/Api/Images";
import "react-phone-number-input/style.css";
import { getAuth, updateProfile } from "firebase/auth";
import { firebaseConfig } from "./firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import notificationSvc from "./services/notificationSvc";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  initializeApp(firebaseConfig);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setName(user?.name);
    }
  }, []);

  const updateWorkshopProfile = async (e) => {
    e.preventDefault();
    updateProfile(getAuth().currentUser, {
      displayName: name,
    }).then(() => {
      notificationSvc.success("Profile Updated Successfully");
      const user = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({ ...user, name: name }));
      navigate("/");
    });
  };

  return (
    <>
      <div className="bg">
        <section className="center-section">
          <div className="registor">
            <div className="logo-div translate-logo">
              <img src={images.logo} alt="" className="logo" />
            </div>
            <h1 className="heading">User Profile</h1>
            <form onSubmit={(e) => updateWorkshopProfile(e)}>
              <div className="form-group">
                <label htmlFor="shopNameInput">Customer Name </label>
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
export default UserProfile;
