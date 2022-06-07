import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";
import { SiGooglemaps } from "react-icons/si";
import { images } from "../src/Api/Images";
import { Link } from "react-router-dom";
import { api } from "./services/apiSvc";
import { Badge, Button } from "react-bootstrap";
import { Profile } from "./services/Profile";
import notificationSvc from "./services/notificationSvc";

const ShopManage = (onLogout) => {
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

  const updateStatus = async (id, status) => {
    const response = await api.post("/updateRequest", {
      id: id,
      status: status,
    });
    if (response && response.ok) {
      notificationSvc.success("Request " + status + " Successfully");
      getRequests();
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
            {showCustomerProfile && <Profile onLogout={onLogout} />}
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
                        <td>
                          <SiGooglemaps />
                        </td>
                        <td>
                          <Badge
                            bg={
                              req.status === "Pending"
                                ? "warning"
                                : req.status === "Rejected"
                                ? "danger"
                                : "primary"
                            }
                            text="dark"
                          >
                            {req.status}
                          </Badge>
                        </td>
                        <td>
                          {req.status === "Pending" && (
                            <>
                              <Button
                                variant="primary"
                                style={{ marginRight: "10px" }}
                                onClick={() =>
                                  updateStatus(req._id, "Accepted")
                                }
                                className="fab"
                              >
                                <BiCheck />
                              </Button>
                              <Button
                                variant="danger"
                                style={{ fontSize: "14px" }}
                                onClick={() =>
                                  updateStatus(req._id, "Rejected")
                                }
                                className="fab"
                              >
                                <BsXLg />
                              </Button>
                            </>
                          )}
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
