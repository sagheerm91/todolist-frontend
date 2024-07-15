import React from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/tokenStore";
import { Navigate } from 'react-router-dom';

function Navbar() {
  const {LogoutUser} = useAuth();

  const handleLogout = async () => {
    await LogoutUser();
    Navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light" id="neubar">
      <div className="container">
        <NavLink className="navbar-brand" to={"/get-todos"}>
          <img src={require('../images/todo3.png')} height="60" alt="Todo Logo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={"nav-link mx-2"} aria-current="page" to={"/get-todos"}>
                Home
              </NavLink>
            </li>
            
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link mx-2 dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={require('../images/user-icon.png')} height="45" alt="User Icon" className="dropdown-icon rounded-avatar" /> {/* Add your image here */}
              </NavLink>
              <ul className="dropdown-menu dropdown-menu-end" >
                <li>
                  <NavLink className="dropdown-item" to={"/account-setting"}>
                    <i className="fa-solid fa-gear"></i> Account Setting
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to={"/logout"}>
                    <i className="fa-solid fa-power-off"></i> Logout
                  </NavLink>
                </li>
              </ul>
            </li> 
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
