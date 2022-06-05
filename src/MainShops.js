import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { images } from "../src/Api/Images";
import { FiEdit } from "react-icons/fi";
import { BiExit } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { api } from "./services/apiSvc";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/firebaseConfig";
import MapsComponent from "./services/Maps";

const MainShops=()=>{
	const [showCustomerProfile, setShowCustomerprofile]=useState(false)
	const [showMap,setShwoMap]=useState(false)
	const [showRequest,setShowRequest]=useState(false)
  const getWorkshops = async () => {
    const response = await api.get(`workshop/get/${latitude}/${longitude}`);
    if (response && response.ok) {
      setShopsData(
        response.data.map((x) => {
          return {
            ...x,
            distance: GetDistance(
              latitude,
              longitude,
              x.latitude,
              x.longitude
            ).toFixed(2),
          };
        })
      );
    }
  };

  var result = useMemo(() => {
    if (!searchText) return shopsData;
    return shopsData.filter((x) =>
      x.type.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, shopsData]);

  const GetDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = ToRadians(lat2 - lat1);
    var dLon = ToRadians(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(ToRadians(lat1)) *
        Math.cos(ToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };
  const ToRadians = (deg) => {
    return deg * (Math.PI / 180);
  };

  const logout = () => {
    localStorage.clear();
    signOut(getAuth()).then(() => {
      onLogout();
      navigate("/");
    });
  };
  const handleValue = (e) => {
    setShowCustomerprofile(false);
    setSearchText(e.target.value);
  };

  const seeMap = (lat, long) => {
    setPosition({ lat: lat, lng: long });
    setShwoMap(true);
  };

  const hideMap = () => {
    setShwoMap(false);
  };
  return (
    <>
      <div className="main-container">
        <div className="top-bar">
          <div className="container profile-container">
            <div className="logo-div">
              <Link to="/">
                <img src={images.logo} className="logo" alt="" />
              </Link>
            </div>

            <div className="header-search">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="search">
                  <input
                    type="search"
                    value={searchText}
                    onChange={handleValue}
                    className="form-control"
                    placeholder="what happened with you"
                    id="gsearch"
                    name="gsearch"
                  />
                  <button type="submit" className="search-btn">
                    <BiSearch />
                  </button>
                </div>
              </form>
            </div>
            <div
              className="customer-profile"
              onClick={() => setShowCustomerprofile(!showCustomerProfile)}
            >
              <img
                src={images.customer}
                className="customer-profile-img"
                alt=""
              />
              {showCustomerProfile && (
                <div className="profile-data">
                  <p className="name">{user?.name}</p>
                  <p className="edit-profile">
                    <FiEdit /> Edit profile
                  </p>
                  <p className="logout" onClick={() => logout()}>
                    <BiExit /> log out
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="shops-top">
          <div className="container">
            <p className="mr-auto recommend">{result.length} Results</p>
            <div className="shops-container">
              {result.map((shop, index) => {
                const { imageUrl, distance, name, type, address, mobile } =
                  shop;
                return (
                  <div className="single-shop" key={index}>
                    <div className="shop-img-container">
                      <img src={imageUrl} className="shop-img" alt="" />
                      <div className="distance">
                        <p>{distance} KM</p>

                        <p
                          className="map"
                          onClick={() => seeMap(shop.latitude, shop.longitude)}
                        >
                          see on map <FiMapPin />
                        </p>
                      </div>
                    </div>
                    <div className="shop-data">
                      <div className="data-inner-wrapper">
                        <div className="name-typ">
                          <p className="shop-name">{name}</p>
                          <p className="shop-name">{type}</p>
                        </div>
                        <p className="address">{address}</p>
                        <p className="phoneno">{mobile}</p>
                      </div>
                    </div>
                    <button type="button" className="contact-btn">
                      Contact
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {showMap && (
          <div className="see-on-map">
            <button className="hide-map" onClick={hideMap}>
              <ImCross />
            </button>
            <div>
              <MapsComponent position={position} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainShops
