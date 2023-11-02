import React from 'react';
import "../../styles/landing_page.css";
import ChatBot from './chatbot';
import { Link } from "react-router-dom";
// import {headerpic} from "../../img/Headerimages/headerpic.png"
const LandingPage = () => {
    return (
        <div >
            <div style={{ display: "flex", position: "relative" }}>
                {/* <img src={headerpic} alt="headerimagestandard" /> */}

                <ChatBot id="landing_page_search" />
            </div>
            <div className='center' >

                <div className='signup'>

                </div>
            </div>

        </div>
    );
}

export default LandingPage;
