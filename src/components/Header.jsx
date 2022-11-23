import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/upmanager_logo.svg";
import "../style/Header.css";

function Header() {
  return (
    <div>
      <Link to="/" className="header">
        <img src={logo} alt="logo" style={{ maxWidth: "150px" }} />
      </Link>
    </div>
  );
}

export default Header;
