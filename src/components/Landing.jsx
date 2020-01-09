import React from "react";
import { Link } from "react-router-dom";

const Landing = props => {
  return (
    <div>
      <div style={{ padding: "15rem 0rem 13rem 0rem" }}>
        <div style={{ fontSize: 52 }}>
          <center>ENS Subdomain Marketplace</center>
        </div>
        <div style={{ fontSize: 24, marginTop: 12, color: "#869ab8" }}>
          <center>Seamlessly Manage, Buy & Sell your ENS Subdomains</center>
        </div>
        <div style={{ marginTop: 36 }}>
          <center>
            <Link
              className="button is-link is-medium"
              to="/buy"
              style={{ borderRadius: 8 }}
            >
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
      <div style={{ padding: "0rem 20rem" }}>
        <div class="columns">
          <div class="column" style={{ marginRight: 10 }}>
            <div class="columns promo_card">
              <div class="column is-two-thirds">
                <div>Put on sale your domain</div>
                <div>
                  <Link
                    className="button is-link"
                    to="/buy"
                    style={{ borderRadius: 8, marginTop: 6 }}
                  >
                    <span>
                      <strong>Sell Now</strong>
                    </span>
                    <span className="icon">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div class="column" style={{ marginLeft: 10 }}>
            <div class="columns promo_card">
              <div class="column is-two-thirds">
                <div>Buy your favorite Domain</div>
                <div>
                  <Link
                    className="button is-link"
                    to="/buy"
                    style={{ borderRadius: 8, marginTop: 6 }}
                  >
                    <span>
                      <strong>Buy Now</strong>
                    </span>
                    <span className="icon">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
