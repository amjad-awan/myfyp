import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { api } from "./apiSvc";
import notificationSvc from "./notificationSvc";

export const RequestForm = ({ show, handleClose, selected }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [formData, setFormData] = useState({
    vehicle_name: "",
    vehicle_type: "",
    vehicle_model: "",
    fault: "",
    description: "",
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const sendRequest = async (e) => {
    e.preventDefault();
    const response = await api.post("/request", {
      ...formData,
      latitude: latitude,
      longitude: longitude,
      workshop_id: selected,
    });
    if (response && response.ok) {
      notificationSvc.success("Request submitted successfully...!!!");
      handleClose();
    }
  };
  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Request</Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => sendRequest(e)}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Vehicle Name</Form.Label>
            <Form.Control
              required
              value={formData.vehicle_name}
              onChange={(e) =>
                setFormData({ ...formData, vehicle_name: e.target.value })
              }
              type="text"
              placeholder="Enter vehicle name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Vehicle Type</Form.Label>
            <Form.Control
              required
              value={formData.vehicle_type}
              onChange={(e) =>
                setFormData({ ...formData, vehicle_type: e.target.value })
              }
              type="text"
              placeholder="Enter vehicle type"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Vehicle Model</Form.Label>
            <Form.Control
              required
              value={formData.vehicle_model}
              onChange={(e) =>
                setFormData({ ...formData, vehicle_model: e.target.value })
              }
              type="number"
              placeholder="Enter vehicle model"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Fault</Form.Label>
            <Form.Control
              required
              value={formData.fault}
              onChange={(e) =>
                setFormData({ ...formData, fault: e.target.value })
              }
              type="text"
              placeholder="Enter fault you are facing"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Description"
              style={{ height: "100px" }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
