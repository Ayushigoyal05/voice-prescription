import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../App";
import Main from "../components/Main";
import Utils from "../utils/utils";
import Web3Service from "../utils/web3";
import DomainDetails from "../components/DomainDetails";
import Dashboard from "../components/Dashboard";
import Landing from "../components/Landing";
import SellDomains from "../components/SellDomains";

const AppRouter = props => {
  const [domainsList, setDomainsList] = React.useState([]);
  const [myDomainList, setMyDomainList] = React.useState([]);
  const [mySubdomainList, setMySubdomainList] = React.useState([]);
  const [selectedAddress, setSelectedAddress] = React.useState();

  // Detect when account changes
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", function(accounts) {
      if (selectedAddress !== undefined) {
        setSelectedAddress(accounts[0]);
      }
    });
  }

  React.useEffect(() => {
    const fetchDomains = async () => {
      const selldomains = await Utils.all_domains();
      setDomainsList(selldomains);
      await Web3Service.start();
      // const address = [];
      // if (address) {
      //   setSelectedAddress(address[0]);
      //   fetchMyDomainAndSubdomain(address[0], domainsList);
      // }
    };

    fetchDomains();
  }, []);

  const addAddress = address => {
    if (address) {
      setSelectedAddress(address[0]);
    }
  };

  const fetchMyDomainAndSubdomain = (selectedAddress, domainsList) => {
    const myDomains = domainsList.filter(
      domain => domain.owner.toLowerCase() === selectedAddress.toLowerCase()
    );
    setMyDomainList(myDomains);
  };

  const updateDomainPrice = (domain, price) => {
    const updatedDomains = domainsList.map(dom =>
      dom.domain_name === domain ? { ...dom, price, on_sale: true } : { ...dom }
    );
    setDomainsList(updatedDomains);
    fetchMyDomainAndSubdomain(selectedAddress, updatedDomains);
  };

  return (
    <Router>
      <App userAddress={selectedAddress} setAddress={addAddress}>
        <Route
          path="/buy"
          exact
          render={() => (
            <Main
              domains={domainsList}
              userAddress={selectedAddress}
              loadSubdomains={10}
            />
          )}
        />
        <Route
          path="/domain/:id"
          render={() => (
            <DomainDetails
              domains={domainsList}
              userAddress={selectedAddress}
            />
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <Dashboard
              userAddress={selectedAddress}
              myDomains={myDomainList}
              mySubdomains={mySubdomainList}
              updateDomainPrice={updateDomainPrice}
              setAddress={addAddress}
            />
          )}
        ></Route>
        <Route path="/" exact component={Landing} />
        <Route path="/sell" exact render={() => <SellDomains />} />
      </App>
    </Router>
  );
};

export default AppRouter;
