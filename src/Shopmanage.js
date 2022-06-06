import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BiExit } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { images } from "../src/Api/Images";
import { Link } from "react-router-dom";
import { api } from "./services/apiSvc";
import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";

const ShopManage = () => {
  const user = localStorage.getItem("user");
  const [showCustomerProfile, setShowCustomerprofile] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    const response = await api.get("/getAllRequest");
    if (response && response.ok) {
      setRequests(response.data);
    }
  };

  return (
    <div>
      <div className="top-bar">
        <div className="container profile-container">
          <div className="logo-div">
            <Link to="#">
              <img src={images.logo} alt="" className="logo" />
            </Link>
          </div>

          <div className="header-search">
            <form>
              <div className="search">
                <input
                  type="search"
                  value=""
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
              alt=""
              className="customer-profile-img"
            />
            {showCustomerProfile && (
              <div className="profile-data">
                <p className="name">{user.name}</p>
                <p className="edit-profile">
                  <FiEdit /> Edit profile
                </p>
                <p
                  className="logout"
                  onClick={() => signOut().then(() => localStorage.clear())}
                >
                  <BiExit /> log out
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="request-table">
        <div className="container">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Sr#</th>
                  <th>Vehicle Name</th>
                  <th>Vehicle Type</th>
                  <th>Vehicle Model</th>
                  <th>Fault</th>
                  <th>Phone Number</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests &&
                  requests.map((req, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{ind + 1}</td>
                        <td>{req.vehicle_name}</td>
                        <td>{req.vehicle_type}</td>
                        <td>{req.vehicle_model}</td>
                        <td>{req.fault}</td>
                        <td>{req.phone}</td>
                        <td>{}</td>
                        <td>{req.status}</td>
                        <td>
                          <Button>
                            <BiCheck />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopManage;
