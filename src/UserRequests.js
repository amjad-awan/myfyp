import React, { useEffect, useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { SiGooglemaps } from "react-icons/si";
import { images } from "./Api/Images";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { api } from "./services/apiSvc";
import { Badge, Button } from "react-bootstrap";
import { Profile } from "./services/Profile";
import notificationSvc from "./services/notificationSvc";
import Maps from "./services/Maps";

const UserRequests = ({ onLogout }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showCustomerProfile, setShowCustomerprofile] = useState(false);
  const [requests, setRequests] = useState([]);
  const [position, setPosition] = useState([]);
  const [showMap, setShwoMap] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [searchText, setSearchText] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    getRequests();
  }, []);

  const seeMap = (name, lat, long) => {
    setPosition([
      ...position,
      { name: name, latitude: lat, longitude: long },
      { name: user.name, latitude: latitude, longitude: longitude },
    ]);
    setShwoMap(true);
  };

  const getRequests = async () => {
    const response = await api.get("/getUserRequests");
    if (response && response.ok) {
      setRequests(response.data);
    }
  };

  var result = useMemo(() => {
    if (!searchText) return requests;
    return requests.filter((x) =>
      x.Workshop.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, requests]);

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

  const hideMap = () => {
    setShwoMap(false);
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
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="search">
                <input
                  type="search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
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
                  <th>Workshop Name</th>
                  <th>Workshop Address</th>
                  <th>Phone Number</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {result &&
                  result.map((req, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{ind + 1}</td>
                        <td>{req.Workshop.name}</td>
                        <td>{req.Workshop.address}</td>
                        <td>{req.Workshop.mobile}</td>
                        <td>
                          <SiGooglemaps
                            style={{ fontSize: "20px" }}
                            onClick={() =>
                              seeMap(
                                req.Workshop.name,
                                req.Workshop.latitude,
                                req.Workshop.longitude
                              )
                            }
                          />
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
                          {req.status === "Accepted" && (
                            <Button
                              variant="primary"
                              style={{ marginRight: "10px" }}
                              className="fab"
                              onClick={() => updateStatus(req._id, "Completed")}
                            >
                              <BiCheck />
                            </Button>
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
      {showMap && (
        <div className="see-on-map">
          <button className="hide-map" onClick={hideMap}>
            <ImCross />
          </button>
          <div>
            <Maps value={position} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRequests;
