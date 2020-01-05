import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../App";
import Main from "../components/Main";
import Store from "../utils/store";
import Web3Service from "../utils/web3";
import DomainDetails from "../components/DomainDetails";
import Dashboard from "../components/Dashboard";
import Landing from "../components/Landing";

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
    const fetchAccount = async () => {
      const selldomains = await Store.all_domains();
      setDomainsList(selldomains);
      const address = await Web3Service.getAccount();
      await Web3Service.start();

      if (address) {
        setSelectedAddress(address[0]);
        fetchMyDomainAndSubdomain(address[0], domainsList);
      }
    };

    fetchAccount();
  }, []);

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
      <App userAddress={selectedAddress}>
        <Route
          path="/buy"
          exact
          render={() => (
            <Main domains={domainsList} userAddress={selectedAddress} />
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
            />
          )}
        ></Route>
        <Route path="/" exact component={Landing} />
      </App>
    </Router>
  );
};

export default AppRouter;
