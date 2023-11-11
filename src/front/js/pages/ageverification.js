import React, { useState } from 'react';
import Homebarprotopsplash1080 from "../../img/Headerimages/Homebarprotopsplash1080.jpg";
import { useNavigate } from 'react-router-dom';
export const AgeVerification = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleRedirect = () => {
    if (selectedOption === 'Yes') {
      setShowModal(false); 
    } else if (selectedOption === 'No') {
      window.location.href = 'https://www.disney.com'; 
    }
  };
  const backgroundImageStyle = {
    backgroundImage: `url(${Homebarprotopsplash1080})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  };
  const boxStyle = {
    backgroundColor: 'black',
    padding: '20px',
    borderRadius: '10px',
  };
  return (
    <div style={backgroundImageStyle}>
      {showModal && (
        <div style={overlayStyle}>
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
      )}
    </div>
  );
}
export default AgeVerification;
