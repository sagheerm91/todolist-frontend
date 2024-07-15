import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-sm navbar-light" id="neubar">
      <div class="container">
        <NavLink class="navbar-brand" to={"/get-todos"}>
          <img src= {require('../images/todo3.png')} height="60" />
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class=" collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto ">
            <li class="nav-item">
              <NavLink className={"nav-link mx-2 "} aria-current="page" to={"/get-todos"}>
                Home
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className={"nav-link mx-2 "} to={"/logout"}>
                Logout
              </NavLink>
            </li>
            
            {/* <li class="nav-item dropdown">
              <a
                class="nav-link mx-2 dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Company
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a class="dropdown-item" href="#">
                    Blog
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    About Us
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Contact us
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
