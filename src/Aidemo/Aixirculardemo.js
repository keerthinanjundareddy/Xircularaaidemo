import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './aixircular.css';
import xircularone from '../Assets/Circular logo.png'

function Aixirculardemo() {
  const [pricingData, setPricingData] = useState({});
  const baseUrl = 'https://ayatana.xircular.io';

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/website-services/2?[populate][media][fields]=url&populate[website_cards][populate][media_list][fields]=url&[populate][media_list][fields]=alternativeText&populate[website_cards][populate][media_list][fields]=alternativeText`)
      .then((response) => {
        console.log("API Response:", response.data);
        // console.log("color",)
        setPricingData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching API data:", error);
      });
  }, []);

  const handleCardClick = (url) => {

    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <>
 
    <div>
     
      {pricingData && pricingData.attributes && (
        <div>
         <div className='navbar-section'>
     <div className='navbar-image'>
      <img  src={`${baseUrl}${ pricingData.attributes.media?.data?.[0]?.attributes?.url}`} className='navbar-image-two'/>
      {/* <img src={imageUrltwo} style={{width:"50px",height:"50px",objectFit:"cover"}} /> */}
     </div>
      </div>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ color: 'Black',textTransform: 'uppercase',paddingTop:"110px" }}>{pricingData.attributes.title}</h2>
          
          </div>
          <div className='pricing-full-page-container'>
            <div className='pricing-flexbox-container'>
              {pricingData.attributes.website_cards.data.map((item, index) => {
                                const imageUrlone = baseUrl + (item.attributes.media_list?.data?.[0]?.attributes?.url || '');
                return (
                  <div key={index} className='pricing-item-section' style={{ backgroundColor:  item.attributes.colour_code   ,borderColor: item.attributes.colour_code ,cursor:"pointer",position:"relative"}} onClick={() => handleCardClick(item.attributes.url)} >
                     <img src={imageUrlone} className='logo-xircular'/>
                    <div style={{ color: item.attributes.title_color_code, paddingTop: "10px", paddingBottom: "10px" }}>{item.attributes.title}</div>
                       <div style={{color: item.attributes.description_color_code}}> {item.attributes.description}</div> 
                    <div style={{position:"absolute",marginTop:"30px",
   position: "absolute",
   marginTop: "30px",
   top: "100%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   textTransform: "uppercase",

   width: "100%",
  // Prevent text from wrapping
   overflow: "hidden", // Hide overflowing content
  //  textOverflow: "ellipsis",
   textAlign:"center" }} > {item.attributes.subtitle}</div>
                    {/* style={{position:"absolute",marginTop:"30px",marginLeft:"80px" ,textTransform: 'uppercase'}} */}
                  </div>
                  
                );
              })}
              
            </div>
            
          </div>
          
        </div>
      )}
    </div>
    </>
  );
}

export default Aixirculardemo;