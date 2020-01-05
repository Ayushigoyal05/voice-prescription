import React from "react";
import makeBlockie from "ethereum-blockies-base64";
import ReactTooltip from "react-tooltip";
import ensLogo from "../assets/image/ens_logo.svg";
import { Link } from "react-router-dom";

const Header = props => {
  const [showFullAddress, setShowFullAddress] = React.useState(false);
  return (
    <nav
      className="navbar is-light is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/">
          <div className="navbar-item">
            <figure
              className="image"
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                height: 36,
                width: 48
              }}
            >
              <img src={ensLogo} alt="ens logo" />
            </figure>
            <h2 className="title has-text-dark">ENS Market</h2>
          </div>
        </Link>
        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            {props.userAddress ? (
              <div>
                <figure
                  className="image is-32x32"
                  style={{ cursor: "pointer" }}
                  data-tip
                  data-for="userAddress"
                >
                  <img
                    src={makeBlockie(props.userAddress)}
                    alt="controller"
                    className="is-rounded"
                  />
                </figure>
                <ReactTooltip
                  id="userAddress"
                  type="dark"
                  effect="float"
                  place="bottom"
                >
                  <span>{props.userAddress}</span>
                </ReactTooltip>
              </div>
            ) : null}
          </div>
          <div className="navbar-item">
            {!props.userAddress ? (
              <button
                className="button is-light"
                style={{ backgroundColor: "#c1c1c1" }}
                disabled
              >
                Dashboard
              </button>
            ) : (
              <Link to="/dashboard" className="button is-link">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
