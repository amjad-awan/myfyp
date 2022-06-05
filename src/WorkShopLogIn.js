import React from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { images } from "../src/Api/Images";

const WorkShopLogIn = () => {
  return (
    <div className="bg">
      <section className="center-section">
        <div className="registor">
          <div className="logo-div translate-logo">
            <img src={images.logo} className="logo" />
          </div>
          <h1 className="heading">Whorkshop Login</h1>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block btn-class"
            >
              Login in <BsArrowRightCircleFill className="arrow-over" />
            </button>
            {/* <a href="workshop-registor.html" className="no-account-link">if didn't registor yet, click here to registor</a> */}
          </form>
        </div>
      </section>
    </div>
  );
};
export default WorkShopLogIn;
