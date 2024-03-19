import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const arr = [
    "about",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  
  const capitaliseFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/logo192.png" alt="logo" height={60} width={60} />
            NewsWrap
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              {arr.map((element) => {
                return (
                  <li className="nav-item" key={element}>
                    <Link className="nav-link" to={`/${element}`}>
                      {capitaliseFirstLetter(element)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="form-check form-switch text-white">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onClick={props.toggleMode}
            />
            <label className="form-check-label" for="flexSwitchCheckDefault">
              Dark Mode
            </label>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
