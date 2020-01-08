import React from "react";
import { withRouter } from "react-router-dom";
import Utils from "../utils/utils";
import DomainDetailTab from "./DomainDetailTab";
import SubdomainItem from "./SubdomainItem";

const DomainDetails = props => {
  const [domain, setDomain] = React.useState();
  const [currentTab, setCurrentTab] = React.useState(0);
  const [showFullAddress, setShowFullAddress] = React.useState(false);

  React.useEffect(() => {
    const currentDomain = props.domains.filter(
      domain => domain.domain_name === props.match.params.id
    )[0];
    setDomain(currentDomain);
  }, []);

  return (
    <div>
      {domain ? (
        <div>
          <section className="hero is-info is-small">
            <div className="hero-body">
              <div className="container">
                <p className="title" style={{ paddingBottom: 8 }}>
                  {domain ? domain.domain_name : ""}
                </p>
                <p
                  className="subtitle"
                  onMouseEnter={e => setShowFullAddress(true)}
                  onMouseOut={e => setShowFullAddress(false)}
                  style={{ cursor: "pointer" }}
                >
                  <strong>Owner:</strong>{" "}
                  {domain
                    ? showFullAddress
                      ? domain.owner
                      : Utils.shortenEthAddr(domain.owner)
                    : null}
                </p>
              </div>
            </div>

            <div className="hero-foot">
              <nav className="tabs is-boxed is-fullwidth">
                <div className="container">
                  <ul>
                    <li className={currentTab === 0 ? "is-active" : null}>
                      <a onClick={e => setCurrentTab(0)}>Details</a>
                    </li>
                    <li className={currentTab === 1 ? "is-active" : null}>
                      <a onClick={e => setCurrentTab(1)}>Subdomains</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </section>
          <main className="section">
            <div className="container">
              {currentTab === 0 ? (
                <DomainDetailTab
                  domain={domain}
                  userAddress={props.userAddress}
                />
              ) : null}
              {currentTab === 1 ? (
                <div>
                  {domain.subdomains.length === 0 ? (
                    <h2 className="title is-5">No subdomain registered</h2>
                  ) : null}
                  {domain.subdomains.map((subdomain, i) => (
                    <SubdomainItem
                      subdomainName={subdomain.subdomain_name}
                      domainName={domain.domain_name}
                      owner={subdomain.owner}
                      price={subdomain.price}
                      removePrice={true}
                      removeParent={true}
                      buyable={false}
                      key={i}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </main>
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(DomainDetails);
