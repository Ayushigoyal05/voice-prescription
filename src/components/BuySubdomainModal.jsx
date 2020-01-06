import React from "react";
import SubdomainItem from "./SubdomainItem";
import Web3Service from "../utils/web3";
import ShowBuyingModal from "./ShowBuyingModal";

const BuySubdomainModal = props => {
  const [subdomainText, setSubdomainText] = React.useState("");
  const [validSubdomain, setValidSubdomain] = React.useState(false);
  const [openBuying, setOpenBuying] = React.useState(false);

  const handleSubdomainText = e => {
    setSubdomainText(e.target.value);
    if (e.target.value) {
      setValidSubdomain(true);
    } else {
      setValidSubdomain(false);
    }
  };

  const closeOpenBuying = () => {
    setOpenBuying(false);
  };

  const buySubdomain = async () => {
    props.close();
    setOpenBuying(true);
    const info = await Web3Service.checkDomain(props.domain, subdomainText);
    console.log(info);
    // console.log(new BN(props.domain.price));
    const tx = await Web3Service.buySubdomain(
      props.domain,
      subdomainText,
      props.address,
      info
    );
    console.log(tx);
  };

  return (
    <div>
      <ShowBuyingModal
        open={openBuying}
        subdomain={subdomainText + "." + props.domain.domain_name}
        close={closeOpenBuying}
      />
      <div className={"modal " + (props.open ? "is-active" : null)}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Buy Subdomain</p>
            <button
              className="delete"
              aria-label="close"
              onClick={props.close}
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="columns" style={{ alignItems: "center" }}>
              <div className="column is-8">
                <div
                  className="control has-icons-right"
                  style={{ marginRight: 12 }}
                >
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter subdomain name"
                    value={subdomainText}
                    onChange={e => handleSubdomainText(e)}
                  />
                  {validSubdomain ? (
                    <span className="icon is-medium is-right has-text-success">
                      <i className="fas fa-check"></i>
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="column is-4">
                <h2 className="title is-5">.{props.domain.domain_name}</h2>
              </div>
            </div>
            {validSubdomain ? (
              <SubdomainItem
                subdomainName={subdomainText}
                domainName={props.domain.domain_name}
                owner={props.domain.owner}
                price={props.domain.price}
                removePrice={false}
                removeParent={false}
                subdomainPrepared={false}
                buyable={false}
                requiredBuyButton={false}
              />
            ) : null}
          </section>
          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={buySubdomain}>
              Buy
            </button>
          </footer>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={props.close}
        ></button>
      </div>
    </div>
  );
};

export default BuySubdomainModal;
