import React from "react";
import {BsArrowRightCircleFill} from "react-icons/bs";
import {images} from "../src/Api/Images"

const WorkShopRegistor=()=>{
	return(
		<div className="bg">
	 <section class="center-section">
        <div class="registor">
        <div className="logo-div translate-logo">
				   <img src={images.logo} className="logo" />
			   </div>
          <h1 class="heading">
            Workshop registration
        </h1>
            <form>
                <div class="form-group">
                    <label for="shopNameInput">Workshop name </label>
                    <input type="text" class="form-control" id="shopNameInput" aria-describedby="emailHelp" />
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
                    <label for="address">Exact address</label>
                    <input type="text" class="form-control" id="address" aria-describedby="emailHelp" />
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlSelect1" >Shop type</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>Motor car workshop</option>
                      <option>Motor bike workshop</option>
                      <option>Tractor workshop</option>
                      <option>Heavy Troller workshop</option>
                      <option>Tyre punchture</option>
                    </select>
                  </div>
				  <div class="form-group">
                  <label for="img">Select picture for workshop</label>
				  <input type="file" id="img"  name="img" accept="image/*" />
                </div>

                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>
				<div class="form-group">
                  <label for="exampleInputPassword1">Confirm Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" class="btn btn-primary btn-block btn-class">Registor as customer <BsArrowRightCircleFill className='arrow-over'/></button>
              </form>  
        </div>
    </section>
	</div>
	)
}
export default WorkShopRegistor