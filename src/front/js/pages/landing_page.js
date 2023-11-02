import React from 'react';
import headerpic from '../../img/Headerimages/SignupHeader4k.png';
import "../../styles/landing_page.css";
import ChatBot from './ChatBot';
import { Link } from "react-router-dom";
const LandingPage = () => {
    return (
        <div >
            <div style={{ display: "flex", position: "relative" }}>
                <img src={headerpic} alt="header" className='header' />
                <ChatBot id="landing_page_search" />
            </div>
            <div className='center' >

                <div className='signup'>
                    <Link className='buttons' to="/sign-up">
                        <span className="btn btn-primary learn-more">Sign up</span>
                    </Link>
                    <Link className='buttons' to="/profile">
                        <span className="btn btn-primary learn-more">my profile</span>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default LandingPage;
