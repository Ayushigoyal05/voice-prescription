import React from "react";
import SubdomainItem from "./SubdomainItem";
import LeaderboardItem from "./LeaderboardItem";
import BuySubdomainModal from "./BuySubdomainModal";
import Loader from "react-loader-spinner";
import Web3Service from "../utils/web3";

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

class Main extends React.Component {
  state = {
    subdomain: "",
    filterDomainText: "",
    subdomainList: [],
    filteredSubdomainList: [],
    loading: false,
    validSubdomain: false,
    leaderboardList: [],
    openBuyModal: false,
    selectedDomain: {},
    selectedOnSale: false,
    selectedOnOffer: false,
    selectedCharLen: [
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
    ],
    doReset: false,
    loadOneTime: false
  };

  handleSubdomainChange = async e => {
    const subdomain = e.target.value;
    this.setState({ subdomain });
  };

  handleLoadMore = async () => {
    this.setState({ loading: true });
    const domains = this.props.domains;
    const newSubdomains = domains.map(domain => ({
      ...domain,
      subdomain_name: this.state.subdomain + "." + domain.domain_name
    }));
    var filteredSubdomainbyAvail = newSubdomains;
    var saleSubdomains = [];
    for (var i = 0; i < newSubdomains.length; i++) {
      const info = await Web3Service.checkDomain(
        this.props.domains[i],
        this.state.subdomain
      );
      filteredSubdomainbyAvail[i].price = parseInt(info.price) / 10 ** 18;
      if (!info.domain) {
        filteredSubdomainbyAvail[i].avail = false;
      } else {
        filteredSubdomainbyAvail[i].avail = true;
      }
      if (filteredSubdomainbyAvail[i].on_sale) {
        saleSubdomains.push(filteredSubdomainbyAvail[i]);
        console.log(saleSubdomains);
        this.setState({ subdomainList: saleSubdomains });
        this.setState({ filteredSubdomainList: saleSubdomains });
      }
    }
    this.setState({ validSubdomain: true });
    this.setState({ loading: false });
  };

  openBuySubdomainModal = (open, domain) => {
    this.setState({ selectedDomain: domain });
    this.setState({ openBuyModal: open });
  };

  closeBuySubdomainModal = () => {
    this.setState({ openBuyModal: false });
  };

  handleFilterDomainText = e => {
    const domain = e.target.value;
    this.setState({ filterDomainText: domain });
    if (e.target.value !== "") {
      const filteredSubdomain = this.state.subdomainList.filter(
        subdomain => subdomain.domain_name.indexOf(domain) !== -1
      );

      if (filteredSubdomain.length > 0) {
        this.setState({ filteredSubdomainList: filteredSubdomain });
      }
    } else {
      this.setState({ filteredSubdomainList: this.state.subdomainList });
    }
  };

  componentDidUpdate() {
    if (
      this.props.domains !== undefined &&
      !this.state.loadOneTime &&
      this.state.leaderboardList.length === 0
    ) {
      setTimeout(() => {
        const sortDomain = this.props.domains.sort((a, b) => {
          var res = 0;
          if (b.subdomains && a.subdomain) {
            res = b.subdomains.length - a.subdomains.length;
          }
          return res;
        });
        const onSaleDomains = sortDomain.filter(domain => domain.on_sale);
        this.setState({
          leaderboardList: onSaleDomains.slice(0, 5),
          loadOneTime: true
        });
      }, 2000);
    }
  }

  sortByPriceLowToHigh = () => {
    if (this.props.domains !== undefined) {
      const sortedDomain = this.state.subdomainList.sort((a, b) => {
        return a.price - b.price;
      });
      const onSaleDomains = sortedDomain.filter(domain => domain.on_sale);
      this.setState({ filteredSubdomainList: onSaleDomains });
    }
  };

  sortByPriceHighToLow = () => {
    if (this.props.domains !== undefined) {
      const sortedDomain = this.state.subdomainList.sort((a, b) => {
        return b.price - a.price;
      });
      const onSaleDomains = sortedDomain.filter(domain => domain.on_sale);
      this.setState({ filteredSubdomainList: onSaleDomains });
    }
  };

  sortByPopularity = () => {
    if (this.props.domains !== undefined) {
      const sortedDomain = this.state.subdomainList.sort((a, b) => {
        return b.subdomains.length - a.subdomains.length;
      });
      const onSaleDomains = sortedDomain.filter(domain => domain.on_sale);
      this.setState({ filteredSubdomainList: onSaleDomains });
    }
  };

  sortByRecent = () => {
    // To be implemented later
  };

  handleOnSale = () => {
    // To be implemented later

    this.setState({ selectedOnSale: !this.state.selectedOnSale });
  };

  handleOnOffer = () => {
    // To be implemented later

    this.setState({ selectedOnOffer: !this.state.selectedOnOffer });
  };

  handleCharLenUpdate = charLen => {
    this.setState({ selectedCharLen: charLen });
  };

  handleReset = () => {
    this.setState({ selectedOnOffer: false });
    this.setState({ selectedOnSale: false });
    this.setState({ filterDomainText: "" });
    this.setState({ filteredSubdomainList: this.state.subdomainList });
    this.setState({
      selectedCharLen: [
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
      ]
    });
    this.setState({ doReset: true });
  };

  render() {
    return (
      <section className="section">
        <div className="container">
          <BuySubdomainModal
            domain={this.state.selectedDomain}
            open={this.state.openBuyModal}
            close={this.state.closeBuySubdomainModal}
            address={this.props.userAddress}
          />
          <div className="columns" style={{ marginBottom: 24 }}>
            <div className="column is-three-fifths is-offset-one-fifth">
              <div
                className={
                  "control is-medium has-icons-left has-icons-right " +
                  (this.state.loading ? "is-loading" : null)
                }
              >
                <input
                  className="input is-medium is-rounded"
                  type="text"
                  placeholder="Search names and address"
                  value={this.state.subdomain}
                  onChange={this.handleSubdomainChange}
                />
                <span className="icon is-medium is-left">
                  <i className="fas fa-search"></i>
                </span>
                {this.state.validSubdomain && !this.state.loading ? (
                  <span className="icon is-medium is-right has-text-success">
                    <i className="fas fa-check"></i>
                  </span>
                ) : null}
              </div>
              <br />
              <center>
                <div>
                  <button
                    className="button is-success"
                    aria-haspopup="true"
                    value={this.state.subdomain}
                    onClick={this.handleLoadMore}
                  >
                    <span>Search Subdomain</span>
                  </button>
                </div>
              </center>
            </div>
          </div>

          {this.state.filteredSubdomainList.length > 0 ? (
            <div>
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="text"
                        placeholder="Filter domain by name"
                        value={this.state.filterDomainText}
                        onChange={this.handleFilterDomainText}
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
                            charLen={this.state.selectedCharLen}
                            onUpdate={this.handleCharLenUpdate}
                            doReset={this.state.doReset}
                            updateDoReset={() =>
                              this.setState({ doReset: false })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="level-item">
                    <div
                      className={
                        this.state.selectedOnSale
                          ? "tag is-link is-large"
                          : "tag-inactive"
                      }
                      style={{ marginLeft: 15, cursor: "pointer" }}
                      onClick={this.state.handleOnSale}
                    >
                      <span style={{ fontSize: 16, fontWeight: 700 }}>
                        On Sale
                      </span>
                      {this.state.selectedOnSale ? (
                        <button className="delete"></button>
                      ) : null}
                    </div>
                    <div
                      className={
                        this.state.selectedOnOffer
                          ? "tag is-link is-large"
                          : "tag-inactive"
                      }
                      style={{ marginLeft: 15, cursor: "pointer" }}
                      onClick={this.handleOnOffer}
                    >
                      <span style={{ fontSize: 16, fontWeight: 700 }}>
                        On Offer
                      </span>
                      {this.state.selectedOnOffer ? (
                        <button className="delete"></button>
                      ) : null}
                    </div>
                  </div>
                  <div
                    className="level-item"
                    style={{
                      cursor: "pointer",
                      marginLeft: 12,
                      fontWeight: 700
                    }}
                    onClick={this.handleReset}
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
                          <a
                            className="dropdown-item"
                            onClick={this.sortByRecent}
                          >
                            Recent
                          </a>
                          <a
                            className="dropdown-item"
                            onClick={this.sortByPopularity}
                          >
                            Popularity
                          </a>
                          <a
                            className="dropdown-item"
                            onClick={this.sortByPriceLowToHigh}
                          >
                            Price Low To High
                          </a>
                          <a
                            className="dropdown-item"
                            onClick={this.sortByPriceHighToLow}
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
                {this.state.filteredSubdomainList.map((subdomain, i) => (
                  <SubdomainItem
                    subdomainName={subdomain.subdomain_name}
                    domain={subdomain}
                    address={this.props.userAddress}
                    domainName={subdomain.domain_name}
                    //owner={subdomain.owner}
                    price={subdomain.price}
                    avail={subdomain.avail}
                    removePrice={false}
                    removeParent={false}
                    subdomainPrepared={true}
                    buyable={true}
                    key={i}
                  />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  className="button"
                  aria-haspopup="true"
                  value={this.state.subdomain}
                  onClick={this.handleLoadMore}
                >
                  <span>Load More</span>
                </button>
              </div>
            </div>
          ) : null}
          {this.state.filteredSubdomainList.length === 0 ? (
            <div>
              <div style={{ marginBottom: 18 }}>
                <center>
                  <h2 className="title">Leaderboard</h2>
                </center>
              </div>
              <div>
                {this.state.leaderboardList.length > 0 ? (
                  this.state.leaderboardList.map((domain, i) => (
                    <LeaderboardItem
                      domain={domain}
                      index={i + 1}
                      setOpenBuyModal={this.openBuySubdomainModal}
                      key={i}
                    />
                  ))
                ) : (
                  <center>
                    <h2
                      className="subtitle"
                      style={{
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <Loader
                        type="Oval"
                        color="#00BFFF"
                        height={24}
                        width={24}
                        style={{ marginRight: 12 }}
                      />{" "}
                      Loading ...{" "}
                    </h2>
                  </center>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    );
  }
}

export default Main;
