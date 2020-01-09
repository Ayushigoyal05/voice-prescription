import React from "react";
import makeBlockie from "ethereum-blockies-base64";
import ReactTooltip from "react-tooltip";
import ensLogo from "../assets/image/ens_logo.svg";
import { Link } from "react-router-dom";
import Web3Service from "../utils/web3";
import { useLocation, useHistory } from "react-router";

const Header = props => {
  const [showFullAddress, setShowFullAddress] = React.useState(false);
  let location = useLocation();
  let history = useHistory();
  const handleConnect = async () => {
    if (location.pathname === "/dashboard") {
      const address = await Web3Service.getAccount();
      props.setAddress(address);
    } else {
      history.push("/dashboard");
    }
  };

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
        <div class="navbar-start">
          <Link
            class={
              "navbar-item " +
              (location.pathname === "/buy" ? "is-active" : null)
            }
            to="/buy"
            style={{ padding: "0px 24px" }}
          >
            Buy
          </Link>
          <Link
            class={
              "navbar-item " +
              (location.pathname === "/sell" ? "is-active" : null)
            }
            to="/sell"
            style={{ padding: "0px 24px" }}
          >
            Sell
          </Link>
        </div>
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
            <button
              onClick={handleConnect}
              className={
                "button " + (props.userAddress ? "is-success" : "is-link")
              }
            >
              {location.pathname === "/dashboard" && !props.userAddress
                ? "Connect"
                : "Dashboard"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
