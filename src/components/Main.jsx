import React from "react";
import SubdomainItem from "./SubdomainItem";
import LeaderboardItem from "./LeaderboardItem";
import BuySubdomainModal from "./BuySubdomainModal";

const Main = props => {
  const [subdomain, setSubdomain] = React.useState("");
  const [filterDomainText, setFilterDomainText] = React.useState("");
  const [subdomainList, setSubdomainList] = React.useState([]);
  const [filteredSubdomainList, setFilteredSubdomainList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [validSubdomain, setValidSubdomain] = React.useState(false);
  const [leaderboardList, setLeaderboardList] = React.useState([]);
  const [openBuyModal, setOpenBuyModal] = React.useState(false);
  const [selectedDomain, setSelectedDomain] = React.useState({});

  const handleSubdomainChange = e => {
    setLoading(true);

    const subdomain = e.target.value;
    setSubdomain(subdomain);
    if (e.target.value !== "") {
      const domains = props.domains;
      const newSubdomains = domains.map(domain => ({
        ...domain,
        subdomain_name: subdomain + "." + domain.domain_name
      }));
      const newSubdomainFiltered = newSubdomains.filter(
        subdomain => subdomain.on_sale
      );
      setSubdomainList(newSubdomainFiltered);
      setFilteredSubdomainList(newSubdomainFiltered);
      setValidSubdomain(true);
    } else {
      setSubdomainList([]);
      setFilteredSubdomainList([]);
      setValidSubdomain(false);
    }
    setLoading(false);
  };

  const openBuySubdomainModal = (open, domain) => {
    setSelectedDomain(domain);
    setOpenBuyModal(open);
  };

  const closeBuySubdomainModal = () => {
    setOpenBuyModal(false);
  };

  const handleFilterDomainText = e => {
    const domain = e.target.value;
    setFilterDomainText(domain);
    if (e.target.value !== "") {
      const filteredSubdomain = subdomainList.filter(
        subdomain => subdomain.domain_name.indexOf(domain) !== -1
      );
      setFilteredSubdomainList(filteredSubdomain);
    } else {
      setFilteredSubdomainList(subdomainList);
    }
  };

  React.useEffect(() => {
    console.log('qweqwe', props.domains)
    if (props.domains !== undefined) {
      const onSaleDomains = props.domains.filter(domain => domain.on_sale);
      setLeaderboardList(onSaleDomains);
    }
  }, [props]);

  const sortByPrice = () => {
    if (props.domains !== undefined) {
      const sortedDomain = subdomainList.sort((a, b) => {
        return b.price - a.price;
      });
      const onSaleDomains = sortedDomain.filter(domain => domain.on_sale);
      setFilteredSubdomainList(onSaleDomains);
    }
  };
  const sortByPopularity = () => {
    if (props.domains !== undefined) {
      const sortedDomain = subdomainList.sort((a, b) => {
        return b.subdomains.length - a.subdomains.length;
      });
      const onSaleDomains = sortedDomain.filter(domain => domain.on_sale);
      setFilteredSubdomainList(onSaleDomains);
    }
  };
  return (
    <section className="section">
      <div className="container">
        <BuySubdomainModal
          domain={selectedDomain}
          open={openBuyModal}
          close={closeBuySubdomainModal}
          address={props.userAddress}
        />
        <div className="columns" style={{ marginBottom: 24 }}>
          <div className="column is-three-fifths is-offset-one-fifth">
            <div
              className={
                "control is-medium has-icons-left has-icons-right " +
                (loading ? "is-loading" : null)
              }
            >
              <input
                className="input is-medium is-rounded"
                type="text"
                placeholder="Search names and address"
                value={subdomain}
                onChange={handleSubdomainChange}
              />
              <span className="icon is-medium is-left">
                <i className="fas fa-search"></i>
              </span>
              {validSubdomain ? (
                <span className="icon is-medium is-right has-text-success">
                  <i className="fas fa-check"></i>
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {filteredSubdomainList.length > 0 ? (
          <div>
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Filter domain by name"
                      value={filterDomainText}
                      onChange={handleFilterDomainText}
                    />
                  </div>
                </div>
              </div>

              <div className="level-right">
                <div className="level-item">
                  <div className="dropdown is-hoverable is-right">
                    <div className="dropdown-trigger">
                      <button
                        className="button"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu4"
                      >
                        <span>Sort by</span>
                        <span className="icon is-small">
                          <i
                            className="fas fa-angle-down"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </button>
                    </div>
                    <div
                      className="dropdown-menu"
                      id="dropdown-menu4"
                      role="menu"
                    >
                      <div className="dropdown-content">
                        <a className="dropdown-item" onClick={sortByPopularity}>
                          Popularity
                        </a>
                        <a className="dropdown-item" onClick={sortByPrice}>
                          Price
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {filteredSubdomainList.map((subdomain, i) => (
                <SubdomainItem
                  subdomainName={subdomain.subdomain_name}
                  domain={subdomain}
                  address={props.userAddress}
                  domainName={subdomain.domain_name}
                  owner={subdomain.owner}
                  price={subdomain.price}
                  removePrice={false}
                  removeParent={false}
                  subdomainPrepared={true}
                  buyable={true}
                  key={i}
                />
              ))}
            </div>
          </div>
        ) : null}
        {filteredSubdomainList.length === 0 ? (
          <div>
            <div style={{ marginBottom: 18 }}>
              <center>
                <h2 className="title">Leaderboard</h2>
              </center>
            </div>
            <div>
              {leaderboardList.map((domain, i) => (
                <LeaderboardItem
                  domain={domain}
                  index={i + 1}
                  setOpenBuyModal={openBuySubdomainModal}
                  key={i}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Main;
