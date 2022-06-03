import React from "react";
import {BsArrowRightCircleFill} from "react-icons/bs";
import {images} from "../src/Api/Images"

const WorkShopLogIn=()=>{
	return(
		<div className="bg">
		<section class="center-section">
        <div class="registor">
        <div className="logo-div translate-logo">
				   <img src={images.logo} className="logo" />
			   </div>
          <h1 class="heading">
              Whorkshop Login
          </h1>
            <form> 
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" class="btn btn-primary btn-block btn-class">Login in <BsArrowRightCircleFill className='arrow-over'/></button>
                {/* <a href="workshop-registor.html" class="no-account-link">if didn't registor yet, click here to registor</a> */}
              </form>  
        </div>
    </section>
	</div>
	)
}
export default WorkShopLogIn