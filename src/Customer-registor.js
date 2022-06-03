import React from "react";
import {BsArrowRightCircleFill} from "react-icons/bs";
import { images } from "./Api/Images";
const Customerregistor=()=>{
	return(
    <div className="bg">
      	<section class="center-section">
        <div class="registor">
        <div className="logo-div translate-logo">
				   <img src={images.logo} className="logo" />
			   </div>
            <h1 class="heading">
                Customer registration
            </h1>
            <form>
                <div class="form-group">
                    <label for="nameInput">Name </label>
                    <input type="text" class="form-control" id="nameInput" aria-describedby="emailHelp" />
                  </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="form-group">
                    <label for="phoneNo">Mobile No</label>
                    <input type="text" class="form-control" id="phoneNo" aria-describedby="emailHelp" />
                  </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" class="btn btn-primary btn-block btn-class">Registor as customer <BsArrowRightCircleFill className='arrow-over'/></button>
              </form>  
        </div>
    </section>
       
    </div>
	
	)
}

export default Customerregistor