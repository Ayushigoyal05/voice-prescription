import React from "react";
import { Link } from "react-router-dom";

const Landing = props => {
  return (
    <div style={{ padding: "15rem 0rem" }}>
      <div style={{ fontSize: 52 }}>
        <center>ENS Subdomain Marketplace</center>
      </div>
      <div style={{ fontSize: 24, marginTop: 12, color: "#869ab8" }}>
        <center>Seamlessly Manage, Buy & Sell your ENS Subdomains</center>
      </div>
      <div style={{ marginTop: 36 }}>
        <center>
          <Link className="button is-link is-medium" to="/buy">
            <span>
              <strong>Explore</strong>
            </span>
            <span className="icon">
              <i className="fas fa-arrow-right"></i>
            </span>
          </Link>
        </center>
      </div>
    </div>
  );
};

export default Landing;
