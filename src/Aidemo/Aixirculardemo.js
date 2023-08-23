import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './aixircular.css';

function Aixirculardemo() {
  const [pricingData, setPricingData] = useState({});
  const baseUrl = 'https://ayatana.xircular.io';

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/website-services/2?populate[website_cards][populate][media_list][fields]=url&populate[website_cards][populate][media_list][fields]=alternativeText`)
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
    <div>
      {pricingData && pricingData.attributes && (
        <>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ color: 'red' }}>{pricingData.attributes.title}</h2>
            <p style={{ color: '#0C0C0C' }}>
              {pricingData.attributes.description_1}
            </p>
          </div>
          <div className='pricing-full-page-container'>
            <div className='pricing-flexbox-container'>
              {pricingData.attributes.website_cards.data.map((item, index) => {
                return (
                  <div key={index} className='pricing-item-section' style={{ backgroundColor: item.attributes.colour_code, borderColor: item.attributes.colour_code }}>
                    <div style={{ color: item.attributes.title_color_code, paddingTop: "10px", paddingBottom: "10px" }}>{item.attributes.title}</div>
                    <div style={{ color: item.attributes.description_color_code }}>{item.attributes.description}</div>
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
