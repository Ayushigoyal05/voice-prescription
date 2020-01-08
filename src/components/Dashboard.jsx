import React from "react";
import Utils from "../utils/utils";
import SubdomainItem from "./SubdomainItem";
import { Link } from "react-router-dom";
import Web3Service from "../utils/web3";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      putOnSale: [],
      salePrice: [],
      firstTimeLoaded: false
    };
  }

  async componentDidUpdate() {
    if (this.props.myDomains.length && !this.state.firstTimeLoaded) {
      this.setState({
        putOnSale: this.props.myDomains.map(domain => false),
        salePrice: this.props.myDomains.map(domain =>
          domain.price ? domain.price : 0
        ),
        firstTimeLoaded: true
      });
    }
  }

  async componentDidMount() {
    const address = await Web3Service.getAccount();
    this.props.setAddress(address);
    if (this.props.myDomains.length && !this.state.firstTimeLoaded) {
      this.setState({
        putOnSale: this.props.myDomains.map(domain => false),
        salePrice: this.props.myDomains.map(domain =>
          domain.price ? domain.price : 0
        ),
        firstTimeLoaded: true
      });
    }
  }

  handleSalePrice = (index, price) => {
    const salePrice = this.state.salePrice;
    salePrice[index] = Number.parseFloat(price);
    this.setState({ salePrice });
  };

  handlePutOnSale = index => {
    const saleBool = this.state.putOnSale;
    saleBool[index] = !saleBool[index];
    this.setState({ putOnSale: saleBool });
  };

  handleUpdatePrice = (index, domain_name) => {
    this.setState({ firstTimeLoaded: false });
    this.props.updateDomainPrice(domain_name, this.state.salePrice[index]);
  };
  render() {
    return (
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <center>
              <h2 className="title">Dashboard</h2>
            </center>
          </div>
          <div>
            <h2 className="title is-5">
              {Utils.capitaliseString("My subdomains")}
            </h2>
            <div>
              {this.props.mySubdomains
                ? this.props.mySubdomains.map((subdomain, i) => (
                    <SubdomainItem
                      subdomainName={subdomain.subdomain_name}
                      domainName={subdomain.parent}
                      owner={subdomain.owner}
                      removePrice={true}
                      removeParent={false}
                      subdomainPrepared={false}
                      key={i}
                    />
                  ))
                : null}
            </div>
            <div style={{ marginTop: 48 }}>
              <h2 className="title is-5">
                {Utils.capitaliseString("My domains")}
              </h2>
              <div>
                <button className="button" aria-haspopup="true">
                  <span>Buy Now</span>
                </button>
                {this.props.myDomains.map((domain, i) => (
                  <div
                    className="card has-background-light"
                    style={{ marginBottom: 18 }}
                    key={i}
                  >
                    <div className="card-content">
                      <div className="level" style={{ minHeight: 48 }}>
                        <div className="level-left">
                          <div style={{ marginRight: 18 }}>
                            <span className="tag is-info is-medium">
                              <h2 className="title is-5 has-text-white">
                                {i + 1}
                              </h2>
                            </span>
                          </div>
                          <div>
                            <h2 className="title is-4">
                              <Link to={`/domain/${domain.domain_name}`}>
                                {domain.domain_name}
                              </Link>
                            </h2>
                          </div>
                        </div>
                        <div className="level-right">
                          {this.state.putOnSale[i] ? (
                            <div className="level-item">
                              <h2 className="title is-6">Set Price:</h2>
                              <span className="icon has-text-link is-large">
                                <i className="fab fa-2x fa-ethereum"></i>
                              </span>
                              <div
                                className="control"
                                style={{ marginRight: 12 }}
                              >
                                <input
                                  className="input"
                                  type="number"
                                  placeholder="0"
                                  style={{ maxWidth: 100 }}
                                  value={this.state.salePrice[i]}
                                  onChange={e =>
                                    this.handleSalePrice(i, e.target.value)
                                  }
                                />
                              </div>
                              <button
                                className="button is-link"
                                style={{ marginRight: 12 }}
                                onClick={e =>
                                  this.handleUpdatePrice(i, domain.domain_name)
                                }
                              >
                                Confirm
                              </button>
                              <button
                                className="button is-danger"
                                onClick={e => this.handlePutOnSale(i)}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="level-item">
                              {!domain.on_sale ? (
                                <button
                                  className="button is-danger"
                                  style={{ marginRight: 12 }}
                                  onClick={e => this.handlePutOnSale(i)}
                                >
                                  Put on Sale
                                </button>
                              ) : (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center"
                                  }}
                                >
                                  <h2 className="title is-5 has-text-success">
                                    On Sale
                                  </h2>
                                  <span className="icon has-text-link is-large">
                                    <i className="fab fa-2x fa-ethereum"></i>
                                  </span>
                                  <h2
                                    className="title is-3"
                                    style={{ marginRight: 12 }}
                                  >
                                    {domain.price}
                                  </h2>
                                  <button
                                    class="button is-danger"
                                    style={{ marginRight: 12 }}
                                    onClick={e => this.handlePutOnSale(i)}
                                  >
                                    Update Price
                                  </button>
                                </div>
                              )}

                              <Link
                                to={`/domain/${domain.domain_name}`}
                                className="button is-link"
                              >
                                Manage
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Dashboard;
