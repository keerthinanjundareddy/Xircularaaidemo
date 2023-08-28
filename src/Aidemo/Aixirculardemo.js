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
    // src={`${baseUrl}${item.attributes.media_1?.data?.[0]?.attributes?.url}`}
    <div>
     
      {pricingData && pricingData.attributes && (
        <>
         <div className='navbar-section'>
     <div style={{width:"100px",height:"80px"}}>
      <img  src={`${baseUrl}${ pricingData.attributes.media?.data?.[0]?.attributes?.url}`} style={{width:"100%",height:"100%",objectFit:"contain" }}/>
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
                  <div key={index} className='pricing-item-section' style={{ backgroundColor: item.attributes.colour_code, borderColor: item.attributes.colour_code,cursor:"pointer",alignItems:"center",justifyContent:"center",position:"relative" }} onClick={() => handleCardClick(item.attributes.url)} >
                     <img src={imageUrlone} style={{width:"50px",height:"50px",objectFit:"cover"}} />
                    <div style={{ color: item.attributes.title_color_code, paddingTop: "10px", paddingBottom: "10px" }}>{item.attributes.title}</div>
                    <div style={{position:"absolute",marginTop:"30px",
    top: "100%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textTransform: "uppercase",}} > {item.attributes.subtitle}</div>
                    {/* style={{position:"absolute",marginTop:"30px",marginLeft:"80px" ,textTransform: 'uppercase'}} */}
                  </div>
                );
              })}
            </div>
          </div>
          
        </>
      )}
    </div>
  );
}

export default Aixirculardemo;