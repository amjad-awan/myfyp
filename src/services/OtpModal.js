import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import OTPInput from "otp-input-react";

export const OtpModal = ({ show, handleClose, onVerify }) => {
  const [OTP, setOTP] = useState("");
  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Verify Otp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="field-verify">
          <center>
            {" "}
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              className=""
              OTPLength={6}
              otpType="number"
              disabled={false}
              inputClassName="form-control"
            />
          </center>
        </div>

        <br />
      </Modal.Body>
      <Modal.Footer>
        <Link onClick={() => onVerify(OTP)} to="#" className="btn btn-primary">
          Verify
        </Link>
      </Modal.Footer>
    </Modal>
  );
};
