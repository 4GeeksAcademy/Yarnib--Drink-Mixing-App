import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../../styles/index.css";
import { Login } from "./login";
import { LoggedIn } from "./loggedin";
import { Context } from "../store/appContext";
import CheerslogoCorner from "../../img/Headerimages/CheerslogoCorner.png";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    const handleLogoClick = () => {
        // Check if you are already on the home page
        if (window.location.pathname === "/") {
            window.location.reload(); // Refresh the page
        } else {
            navigate("/"); // Navigate to the home page
        }
    };

    return (
        <nav className="navbar custom-navbar-bg">
            <div className="container d-flex justify-content- align-items-center" style={{ marginLeft: 0 + 'px', paddingLeft: 0 + 'px' }}>
                <Link to="/" onClick={handleLogoClick}>
                    <img
                        src={CheerslogoCorner}
                        alt="Home Bar Pro"
                        className="navbar-logo"
                        style={{ transform: 'scale(.7)' }}
                    />
                </Link>
                <div>
                    {store.accessToken !== undefined ? (
                        <LoggedIn />
                    ) : (
                        <Login />
                    )}
                </div>

                <div className="d-flex justify-content- align-items-right"> 
    <Link to="/BlogPage" className="tab-link">
        Blog
    </Link>
    <Link to="/Social" className="tab-link">
        Social
    </Link>
    <Link to="/userfavorites" className="tab-link">
        Favorites
    </Link>
</div>
            </div>
        </nav>
    );
};

export default Navbar;
