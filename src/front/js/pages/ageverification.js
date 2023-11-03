import React, { useState } from 'react';
import Homebarprotopsplash1080 from "../../img/Headerimages/Homebarprotopsplash1080.jpg";

function AgeVerification() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleRedirect = () => {
    if (selectedOption === 'Yes') {
      // Redirect to the desired URL when "Yes" is selected.
      window.location.href = '/'; // Change this to your desired URL
    } else if (selectedOption === 'No') {
      window.location.href = 'https://www.disney.com'; // Redirect to Disney.com
    }
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${Homebarprotopsplash1080})`, // Use the actual path to your image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const boxStyle = {
    backgroundColor: 'black',
    padding: '20px',
    borderRadius: '10px',
  };

  

  return (
    <div style={backgroundImageStyle}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={boxStyle}>
          <h1>Age Verification</h1>
          <p>Are you 21 or older?</p>
          <select style={{ width: '200px', padding: '10px', fontSize: '16px' }} value={selectedOption} onChange={handleOptionChange}>
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <button style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '20px' }} onClick={handleRedirect}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default AgeVerification;
