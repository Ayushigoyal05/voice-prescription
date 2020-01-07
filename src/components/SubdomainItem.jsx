import React from "react";
import Store from "../utils/store";
import { Link } from "react-router-dom";
import Web3Service from "../utils/web3";
import ShowBuyingModal from "./ShowBuyingModal";

const SubdomainItem = props => {
  const [openBuying, setOpenBuying] = React.useState(false);
  const buySubdomain = async () => {
    const address = await Web3Service.getAccount();
    if (props.buyable) {
      setOpenBuying(true);
      const info = await Web3Service.checkDomain(
        props.domain,
        props.subdomainName.split(".")[0]
      );
      const tx = await Web3Service.buySubdomain(
        props.domain,
        props.subdomainName.split(".")[0],
        address[0],
        info
      );
      closeOpenBuying();
    }
  };
  const closeOpenBuying = () => {
    setOpenBuying(false);
  };
  return (
    <div className="card has-background-light" style={{ marginBottom: 18 }}>
      {props.buyable ? (
        <ShowBuyingModal
          open={openBuying}
          subdomain={
            props.subdomainName.split(".")[0] + "." + props.domain.domain_name
          }
          close={closeOpenBuying}
        />
      ) : null}
      <div className="card-content">
        <div className="level">
          <div className="level-left">
            <div>
              <h2 className="title is-4">
                {props.subdomainPrepared
                  ? props.subdomainName
                  : props.subdomainName + "." + props.domainName}
              </h2>
              {!props.removeParent ? (
                <h2 className="title is-5">
                  Parent:{" "}
                  <Link to={`/domain/${props.domainName}`}>
                    {props.domainName}
                  </Link>
                </h2>
              ) : null}
            </div>
          </div>
          <div className="level-right">
            {!props.removePrice ? (
              <div className="level-item">
                <div>
                  <span className="icon has-text-link is-large">
                    <i className="fab fa-2x fa-ethereum"></i>
                  </span>
                </div>
                <div className="title">{props.price}</div>
              </div>
            ) : null}
            {!props.avail ? (
              <button
                className="button is-warning"
                aria-haspopup="true"
                disabled={true}
              >
                <span>Buy Now</span>
              </button>
            ) :
            (
              <button
                className="button is-success"
                aria-haspopup="true"
                onClick={buySubdomain}
              >
                <span>Buy Now</span>
              </button>
            ) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubdomainItem;
