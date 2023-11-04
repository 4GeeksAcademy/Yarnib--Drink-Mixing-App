import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/index.css";
import { Login } from "./login";
import { LoggedIn } from "./loggedin";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogoClick = () => {
        if (window.location.pathname === "/") {
            window.location.reload();
        } else {
            navigate("/");
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="navbar custom-navbar-bg">
            <div className="container d-flex justify-content-align-items-center">
                <Link to="/" onClick={handleLogoClick}>
                    <img
                        src={CheerslogoCorner}
                        alt="Home Bar Pro"
                        className="navbar-logo"
                        style={{ transform: 'scale(.7)' }}
                    />
                </Link>

                <div className="tab-link-container">
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

                <div className="dropdown-container">
                    <button onClick={toggleDropdown} className="dropbtn">
                        Menu
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-content">
                            {store.accessToken !== undefined ? (
                                <LoggedIn style={{ width: '300px', height: '300px' }} />
                            ) : (
                                <Login style={{ width: '300px', height: '300px' }} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
export default Navbar