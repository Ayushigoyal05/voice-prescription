import Web3Service from "./web3";

class Store {

  all_domains = async () => {
    await Web3Service.getDomains();
    return Web3Service.allDomains;
  };

  shortenEthAddr = str => {
    const shortenStr =
      str &&
      `${str.substring(0, 5)}...${str.substring(str.length - 5, str.length)}`;
    return shortenStr;
  };

  capitaliseString = str => {
    return str.toUpperCase();
  };
}

export default new Store();
