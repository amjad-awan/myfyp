import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {NavLink} from "react-router-dom"
import {FcGoogle} from "react-icons/fc";
import {FiFacebook} from "react-icons/fi";
import {BsArrowRightCircleFill} from "react-icons/bs";
import {images} from "../src/Api/Images"


const CustomerLogin=()=>{
	return(
    <div className='bg'>
       	<section className="center-section">
        <div className="registor">
        <div className="logo-div translate-logo">
				   <img src={images.logo} className="logo" />
			   </div>
          <h1 class="heading">
              customer Login
          </h1>
            <form>
              
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-class">Login in <BsArrowRightCircleFill className='arrow-over'/> </button>
			  </form> 
			  {/* <NavLink to="/" className="no-account-link">if didn't registor yet, click here to registor</NavLink> */}
            <div className='or-line'>
				<span className='or'> or login with</span>
			</div>

			<div className='social-plate-form'>
             <span><FcGoogle/></span>
			 <span><FiFacebook/></span>
			</div>
		</div>
    </section>
    </div>
	
	)
}

export default CustomerLogin
