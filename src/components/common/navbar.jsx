import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    Vidly
                </NavLink>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/movies">
                                Movie
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/customers">
                                Customers
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/rentals">
                                Rentals
                            </NavLink>
                        </li>
                        {!user && (
                            <React.Fragment>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">
                                        Register
                                    </NavLink>
                                </li>
                            </React.Fragment>
                        )}
                        {user && (
                            <React.Fragment>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/profile">
                                        { user.name }
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/Logout">
                                        Logout
                                    </NavLink>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
