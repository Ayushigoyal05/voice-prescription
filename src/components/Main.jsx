import React from "react";
import SubdomainItem from "./SubdomainItem";
import LeaderboardItem from "./LeaderboardItem";
import BuySubdomainModal from "./BuySubdomainModal";

class CustomCheckbox extends React.Component {
  state = {
    charLen: this.props.charLen
  };
  handleCharLengthChange = (index, event) => {
    var { charLen } = this.state;
    charLen[index].selected = event.target.checked;
    this.props.onUpdate(charLen);
    this.setState({ charLen });
  };
  componentDidUpdate() {
    if (this.props.doReset) {
      this.setState({ charLen: this.props.charLen });
      this.props.updateDoReset();
    }
  }
  render() {
    return (
      <div>
        {this.state.charLen.map((charLen, i) => (
          <div className="dropdown-item" key={i}>
            <span>
              <input
                type="checkbox"
                checked={charLen.selected}
                style={{ marginRight: 4 }}
                onChange={e => this.handleCharLengthChange(i, e)}
              />
              {charLen.type}
            </span>
          </div>
        ))}
      </div>
    );
  }
}

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
  const [selectedOnSale, setSelectedOnSale] = React.useState(false);
  const [selectedOnOffer, setSelectedOnOffer] = React.useState(false);
  const [selectedCharLen, setSelectedCharLen] = React.useState([
    {
      type: "3 Characters",
      selected: false
    },
    {
      type: "4 Characters",
      selected: false
    },
    {
      type: "5 Characters",
      selected: false
    },
    {
      type: "6 Characters",
      selected: false
    },
    {
      type: "7+ Characters",
      selected: false
    }
  ]);
  const [doReset, setDoReset] = React.useState(false);

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
    if (props.domains !== undefined) {
      const sortedDomain = props.domains.sort((a, b) => {
        var res = 0;
        if (b.subdomains && a.subdomain) {
          res = b.subdomains.length - a.subdomains.length;
        }
        return res;
      });
      const onSaleDomains = sortedDomain.filter(domain => domain.on_sale);
      setLeaderboardList(onSaleDomains.slice(1,5));
    }
  }, [props]);

  const sortByPriceLowToHigh = () => {
    if (props.domains !== undefined) {
      const sortedDomain = subdomainList.sort((a, b) => {
        return a.price - b.price;
      });
      const onSaleDomains = sortedDomain.filter(domain => domain.on_sale);
      setFilteredSubdomainList(onSaleDomains);
    }
  };

  const sortByPriceHighToLow = () => {
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

  const sortByRecent = () => {
    // To be implemented later
  };

  const handleOnSale = () => {
    // To be implemented later

    setSelectedOnSale(!selectedOnSale);
  };

  const handleOnOffer = () => {
    // To be implemented later

    setSelectedOnOffer(!selectedOnOffer);
  };

  const handleCharLenUpdate = charLen => {
    setSelectedCharLen(charLen);
  };

  const handleReset = () => {
    setSelectedOnOffer(false);
    setSelectedOnSale(false);
    setFilterDomainText("");
    setFilteredSubdomainList(subdomainList);
    setSelectedCharLen([
      {
        type: "3 Characters",
        selected: false
      },
      {
        type: "4 Characters",
        selected: false
      },
      {
        type: "5 Characters",
        selected: false
      },
      {
        type: "6 Characters",
        selected: false
      },
      {
        type: "7+ Characters",
        selected: false
      }
    ]);
    setDoReset(true);
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
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      placeholder="Filter domain by name"
                      value={filterDomainText}
                      onChange={handleFilterDomainText}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                </div>
                <div className="level-item">
                  <div className="dropdown is-hoverable">
                    <div className="dropdown-trigger">
                      <button
                        className="button"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu4"
                      >
                        <span>Character Length</span>
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
                        <CustomCheckbox
                          charLen={selectedCharLen}
                          onUpdate={handleCharLenUpdate}
                          doReset={doReset}
                          updateDoReset={() => setDoReset(false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="level-item">
                  <div
                    className={
                      selectedOnSale ? "tag is-link is-large" : "tag-inactive"
                    }
                    style={{ marginLeft: 15, cursor: "pointer" }}
                    onClick={handleOnSale}
                  >
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      On Sale
                    </span>
                    {selectedOnSale ? (
                      <button className="delete"></button>
                    ) : null}
                  </div>
                  <div
                    className={
                      selectedOnOffer ? "tag is-link is-large" : "tag-inactive"
                    }
                    style={{ marginLeft: 15, cursor: "pointer" }}
                    onClick={handleOnOffer}
                  >
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      On Offer
                    </span>
                    {selectedOnOffer ? (
                      <button className="delete"></button>
                    ) : null}
                  </div>
                </div>
                <div
                  className="level-item"
                  style={{ cursor: "pointer", marginLeft: 12, fontWeight: 700 }}
                  onClick={handleReset}
                >
                  <a className="delete" style={{ marginRight: 8 }}></a>Reset
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
                        <a className="dropdown-item" onClick={sortByRecent}>
                          Recent
                        </a>
                        <a className="dropdown-item" onClick={sortByPopularity}>
                          Popularity
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={sortByPriceLowToHigh}
                        >
                          Price Low To High
                        </a>
                        <a
                          className="dropdown-item"
                          onClick={sortByPriceHighToLow}
                        >
                          Price High to Low
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
