import { default as Web3 } from "web3";
import { default as contract } from "truffle-contract";
import subdomainregistrar_artifacts from "../contracts/EthRegistrarSubdomainRegistrar.json";
import ens_artifacts from "../contracts/ENS.json";
import { keccak_256 as sha3 } from "js-sha3";
import { default as namehash } from "eth-ens-namehash";

const referrerAddress = "0x0904Dac3347eA47d208F3Fd67402D039a3b99859";

const SubdomainRegistrar = contract(subdomainregistrar_artifacts);
const ENS = contract(ens_artifacts);

class Web3Service {
  allDomains = [
    {
      domain_name: "etherbase.eth",
      owner: "0xDDF369C3bf18b1B12EA295d597B943b955eF4671",
      controller: "0xC32659651D137A18b79925449722855aA327231d",
      registrant: "0xC32659651D137A18b79925449722855aA327231d",
      registration_date: "2020.05.04 at 05:30",
      parent: "eth",
      on_sale: true,
      price: 0,
      subdomains: [
        {
          subdomain_name: "mrfixpixdfj",
          owner: "0x09b28aBeb3c6a60C802Df628d3397C4449A842a5",
          registration_date: "2019.07.24 at 16:44"
        },
        {
          subdomain_name: "serkklanmen",
          owner: "0x4eb28aBeb3c6a60C802AJH28d3397C4449A849H2",
          registration_date: "2019.03.14 at 13:16"
        },
        {
          subdomain_name: "jkdjsliujj",
          owner: "0xOu632585420403sdb184C4C1p6c420eC40f1c9JH",
          registration_date: "2019.07.22 at 22:54"
        },
        {
          subdomain_name: "opkerwmr",
          registration_date: "2019.09.16 at 20:23",
          owner: "0xa7B5B93BF8B322023BDa57e2C86B57f4DDb4F4a1"
        }
      ]
    },
    {
      domain_name: "isfund.eth",
      parent: "eth",
      registration_date: "2019.03.08 at 13:35",
      on_sale: true,
      price: 0.03,
      owner: "0xC32659651D137A18b79925449722855aA327231d",
      controller: "0xC32659651D137A18b79925449722855aA327231d",
      registrant: "0xC32659651D137A18b79925449722855aA327231d",
      resolver: "0xD4fC014343cd971B7eb70732021E26dk5B744cf4",
      subdomains: [
        {
          subdomain_name: "mrfixpix",
          owner: "0x4eb28aBeb3c6a60C802A5628d3397C4449A842a5",
          registration_date: "2017.06.04 at 12:46"
        },
        {
          subdomain_name: "serkansokmen",
          owner: "0x4eb28aBeb3c6a60C802A5628d3397C4449A842a5",
          registration_date: "2017.06.08 at 13:36"
        },
        {
          subdomain_name: "mumuss",
          owner: "0xE163258542040394b184C4C166c420eC40f1c222",
          registration_date: "2017.06.12 at 18:34"
        },
        {
          subdomain_name: "jkerskr",
          registration_date: "2019.09.14 at 10:47",
          owner: "0xa7B5B93BF8B322023BDa57e2C86B57f4DDb4F4a1"
        }
      ]
    },
    {
      domain_name: "thecryptoguy.eth",
      parent: "eth",
      registration_date: "2019.12.12 at 21:12",
      on_sale: false,
      price: 0.02,
      owner: "0xa7B5B93BF8B322023BDa57e2C86B57f4DDb4F4a1",
      controller: "0xa7B5B93BF8B322023BDa57e2C86B57f4DDb4F4a1",
      registrant: "0xa7B5B93BF8B322023BDa57e2C86B57f4DDb4F4a1",
      resolver: "0x2dfC014343cd971Bfdb70732021E26dk5B744csd",
      subdomains: []
    },
    {
      domain_name: "trustnobank.eth",
      parent: "eth",
      registration_date: "2019.12.12 at 21:12",
      on_sale: false,
      price: 0.01,
      owner: "0xa7B5B93BF8B322023BDa57e2C86B57f4DDb4F4a1",
      controller: "0xa7B5B93BF8B322023BDa57e2C86B57f4DDb4F4a1",
      registrant: "0xa7B5B93BF8B322023BDa57e2C86B57f4DDb4F4a1",
      resolver: "0x2dfC014343cd971Bfdb70732021E26dk5B744csd",
      subdomains: []
    }
  ];
  registrarVersions = {
    query: async (domain, subdomain) => {
      return domain.contract.query(
        "0x" + sha3(domain.domain_name.split(".")[0]),
        subdomain
      );
    },
    register: async (
      domain,
      subdomain,
      ownerAddress,
      referrerAddress,
      resolverAddress,
      value
    ) => {
      console.log(value);
      return domain.contract.register(
        "0x" + sha3(domain.domain_name.split(".")[0]),
        subdomain,
        ownerAddress,
        referrerAddress,
        resolverAddress,
        {
          from: ownerAddress,
          value: value
        }
      );
    }
  };

  start = async () => {
    SubdomainRegistrar.setProvider(window.web3.currentProvider);
    ENS.setProvider(window.web3.currentProvider);

    try {
      this.ens = await ENS.deployed();

      // Construct instances of the registrars we know about
      await this.buildInstances();

      // Get the address of the current public resolver
      this.resolverAddress = await this.ens.resolver(
        namehash.hash("resolver.eth")
      );
    } catch (e) {
      console.log(e);
    }
  };

  buildInstances = async () => {
    var registrars = {};
    for (var i = 0; i < this.allDomains.length; i++) {
      var domain = this.allDomains[i];

      if (registrars[domain.registrar] === undefined) {
        registrars[domain.registrar] = await (domain.registrar === undefined
          ? SubdomainRegistrar.deployed()
          : SubdomainRegistrar.at(domain.registrar));
      }
      this.allDomains[i].contract = registrars[domain.registrar];
    }
  };

  checkDomain = async (domain, subdomain) => {
    var info = await this.registrarVersions.query(domain, subdomain);
    return info;
  };

  buySubdomain = async (domain, subdomain, account, info) => {
    console.log(info);
    var tx = await this.registrarVersions.register(
      domain,
      subdomain,
      account,
      referrerAddress,
      this.resolverAddress,
      info[1]
    );
    return tx;
  };

  getAccount = async () => {
    let account = null;
    try {
      if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
      ) {
        account = await window.ethereum.enable();
        window.web3 = new Web3(window.ethereum);
        window.readOnly = false;
      } else {
        window.web3 = new Web3(
          new Web3.providers.HttpProvider(
            "https://mainnet.infura.io/Rg6BrBl8vIqJBc7AlL9h"
          )
        );
        window.readOnly = true;
      }
    } catch (error) {
      console.log(error);
    }
    return account;
  };
}

export default new Web3Service();
