import React from 'react';
import headerpic from '../../img/headerpic.png';
import "../../styles/landing_page.css";
import ChatBot from './ChatBot';

const LandingPage = ({ loggedIn }) => {
    return (
        <div>
            <div style={{ display: "flex", position: "relative" }}>
                <img src={headerpic} alt="header" className='header' />
                <ChatBot id="landing_page_search" />
            </div>
            <div className='center-board'>
                <div className='center left'>
                    <h2>log0</h2>
                </div>
                <div className='middle'>
                    <h2>center</h2>
                </div>
                <div className='center right'>
                    {loggedIn ? (
                        <h2>Welcome, User!</h2>
                    ) : (
                        <h2>Not logged in</h2>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
