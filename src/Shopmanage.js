import React, {useState} from "react";
import {FiEdit} from "react-icons/fi";
import {BiExit} from "react-icons/bi";
import {BiSearch} from "react-icons/bi";
import {images} from "../src/Api/Images"

const Shopmanage=()=>{
	const [showCustomerProfile, setShowCustomerprofile]=useState(false)


	return(
	<div>
  <div className="top-bar">
		   <div className="container profile-container">
			   <div className="logo-div">
				   <a href="#"><img src={images.logo} className="logo"/></a>
			   </div>

          <div className="header-search">
			  <form>
			  <div className="search">
            <input type="search" value="" className="form-control" placeholder="what happened with you" id="gsearch" name="gsearch" />
			<button type="submit" className="search-btn"><BiSearch/></button>
			</div>
			</form>
		  </div>
		  <div className="customer-profile" onClick={()=>setShowCustomerprofile(!showCustomerProfile)}>
                   <img src={images.customer} className="customer-profile-img"/>
{
	showCustomerProfile &&<div className="profile-data">
	<p className="name">Amjad mehmood</p>
	<p className="edit-profile"><FiEdit/> Edit profile</p>
	<p className="logout"><BiExit/> log out</p>
   </div>
}		  
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
        <th>Vehcile name </th>
        <th>vehicle type</th>
        <th>Vehicl modal</th>
		<th>Vehicl location</th>
		<th>fault type</th>
		<th>contact</th>
		<th>resolved</th>
      </tr>
    </thead>
    <tbody>
      <tr>
	  <td>1</td>
        <td>motor car</td>
        <td>civic</td>
        <td>2022</td>
		<td>near bakhshan</td>
		<td>engin fault </td>
		<td>03027543636</td>
		<td>not </td>
      </tr>
	  <tr>
	  <td>2</td>
        <td>motor car</td>
        <td>civic</td>
        <td>2022</td>
		<td>near bakhshan</td>
		<td>engin fault </td>
		<td>03027543636</td>
		<td>yes </td>
      </tr>
	  <tr>
	  <td>3</td>
        <td>motor car</td>
        <td>civic</td>
        <td>2022</td>
		<td>near bakhshan</td>
		<td>engin fault </td>
		<td>03027543636</td>
		<td>not </td>
		
      </tr>
    
    </tbody>
  </table>
  </div>

			   </div>
		
		   </div>

          
		
	</div>
	)
}

export default Shopmanage