import React from "react";
import { FiEdit } from "react-icons/fi";
import { BiExit } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/firebaseConfig";

export const Profile = ({ onLogout }) => {
  initializeApp(firebaseConfig);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    signOut(getAuth()).then(() => {
      onLogout();
      navigate("/");
    });
  };
  return (
    <div className="profile-data">
      <p className="name">{user?.name}</p>
      <p className="edit-profile">
        <FiEdit /> Edit profile
      </p>
      <p className="logout" onClick={() => logout()}>
        <BiExit /> log out
      </p>
    </div>
  );
};
