import React, { useEffect, useState } from "react";
import {BiSearch} from "react-icons/bi";
import {images} from "../src/Api/Images"
import {FiEdit} from "react-icons/fi";
import {BiExit} from "react-icons/bi";
import {FiMapPin} from "react-icons/fi";
import { ShopsData } from "./Api/ShopsData";
import {ImCross} from "react-icons/im";




const MainShops=()=>{
	const [showCustomerProfile, setShowCustomerprofile]=useState(false)
	const [showMap,setShwoMap]=useState(false)

	const [shopsData, setShopsData]=useState(ShopsData)
	const [value, setValue]=useState("")
	const handleSubmit =(e)=>{
		e.preventDefault()
		setShowCustomerprofile(false)
		console.log(value)
		if(value==="")
		{
			setShopsData(ShopsData)
		}
		else {
			const newShops=shopsData.filter((shop)=>{
					return shop.type.toUpperCase()==value.trim().toUpperCase()
			})
			setShopsData(newShops)
			if(newShops=="")
			{
				setValue("")
					alert("there is no such shop : Spell Correctly")
					setShopsData(ShopsData)
			}
			
		}

		
		
	}
	const handleValue=(e)=>{
		setShowCustomerprofile(false)
	setValue(e.target.value)
	}
useEffect(()=>{
	setShopsData(ShopsData)
},[value])

const seeMap=()=>{
	setShwoMap(true)
}
const hideMap=()=>{
	setShwoMap(false)
}
	return(
		<div className="main-container">
           
		   <div className="top-bar">
		   <div className="container profile-container">
			   <div className="logo-div">
				   <a href="#"><img src={images.logo} className="logo"/></a>
			   </div>

          <div className="header-search">
			  <form onSubmit={handleSubmit}>
			  <div className="search">
            <input type="search" value={value} onChange={handleValue} className="form-control" placeholder="what happened with you" id="gsearch" name="gsearch" />
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


<div className="shops-top">
<div className="container">
			   <p className="mr-auto recommend">{shopsData.length} Results</p>
			   <div className="shops-container">
				   {
					    shopsData.map((shop,index)=>{
							const {id,image, distance, name,type, address, phone}=shop
							return(
								<div className="single-shop" key={index}>
								<div className="shop-img-container">
								 <img src={image} className="shop-img"/>
								 <div  className="distance">
								 <p>{distance}</p>
			   
								 <p className="map" onClick={seeMap}>see on map <FiMapPin/></p>
								 </div>		 
								</div>
								<div className="shop-data">
									<div className="data-inner-wrapper">
										<div className="name-typ">
										<p className="shop-name">{name}</p>
										<p className="shop-name">{type}</p>
										</div>
									<p className="address">{address}</p>
									<p className="phoneno">{phone}</p>
									</div>
			   
								</div>
								<button type="button" className="contact-btn">Contact</button>
							   </div>

							)
						})
				   }
               
			
			
			   </div> 
		   </div>
</div>
		   	

{
	showMap &&<div className="see-on-map">
		<button className="hide-map" onClick={hideMap}><ImCross/></button>
	<div>
	{/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.4751441024773!2d72.72686182252302!3d29.739309510411697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393daaa90f2c25d1%3A0xb7e800d5f627ee6a!2sBakhshan%20Khan%2C%20Bahawalnagar%2C%20Punjab!5e0!3m2!1sen!2s!4v1654163068014!5m2!1sen!2s" width="100%" height="450" style="border:0;" allowfullscreen="">
		</iframe>	 */}
		</div>
</div>
}
			   
		</div>
	)
}

export default MainShops