import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BiExit } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { images } from "./Api/Images";
import { Link } from "react-router-dom";
import { api } from "./services/apiSvc";
import { Button } from "react-bootstrap";

const UserRequests = () => {
  const [showCustomerProfile, setShowCustomerprofile] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    const response = await api.get("/getUserRequests");
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
                <p className="name">Amjad mehmood</p>
                <p className="edit-profile">
                  <FiEdit /> Edit profile
                </p>
                <p className="logout">
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
                  <th>Workshop Name</th>
                  <th>Workshop Address</th>
                  <th>Phone Number</th>
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
                        <td>{req.Workshop.name}</td>
                        <td>{req.Workshop.address}</td>
                        <td>{req.Workshop.mobile}</td>
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

export default UserRequests;
