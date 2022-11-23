import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function HomePage() {
  return (
    <div>
      {" "}
      <Header />
      <Link to="/login">
        <button className="btnAuth">Login</button>
      </Link>
      <Link to="/signup">
        <button className="btnAuth">Signup</button>
      </Link>
    </div>
  );
}

export default HomePage;
