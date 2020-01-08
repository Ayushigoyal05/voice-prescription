import React from "react";
import { Link } from "react-router-dom";

const Landing = props => {
  return (
    <div>
      <div style={{ padding: "15rem 0rem" }}>
        <div style={{ fontSize: 52 }}>
          <center>ENS Subdomain Marketplace</center>
        </div>
        <div style={{ fontSize: 24, marginTop: 12, color: "#869ab8" }}>
          <center>Seamlessly Manage, Buy & Sell your ENS Subdomains</center>
        </div>
        <div style={{ marginTop: 36 }}>
          <center>
            <Link
              className="button is-link is-medium"
              to="/buy"
              style={{ borderRadius: 8 }}
            >
              <span>
                <strong>Explore</strong>
              </span>
              <span className="icon">
                <i className="fas fa-arrow-right"></i>
              </span>
            </Link>
          </center>
        </div>
      </div>
      <div style={{ padding: "15rem 0rem" }} className="is-light">
        <div style={{ fontSize: 52 }}>
          <center>Our Features</center>
        </div>
        <div style={{ fontSize: 24, marginTop: 12, color: "#869ab8" }}>
          <center>Seamlessly Manage, Buy & Sell your ENS Subdomains</center>
        </div>
        <div style={{ marginTop: 36 }}>
          <center>
            <Link
              className="button is-link is-medium"
              to="/buy"
              style={{ borderRadius: 8 }}
            >
              <span>
                <strong>Explore</strong>
              </span>
              <span className="icon">
                <i className="fas fa-arrow-right"></i>
              </span>
            </Link>
          </center>
        </div>
      </div>
      <div style={{ padding: "15rem 0rem" }}>
        <div style={{ fontSize: 52 }}>
          <center>FAQs</center>
        </div>
        <div style={{ marginTop: 36 }}>
          <center>
            <div style={{ width:600 }} class="card">
              <header class="card-header">
                <p class="card-header-title">
                  What is ENS?
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
              </header>
              <div class="card-content">
                <div class="content">
                  ENS is a naming system on Ethereum which lets you attach human readable names to your crypto address. With ENS, people can send you Bitcoin, Litecoin, Ripple, Ether, or any other currency to something like "myname.eth" instead of "0x85....3789".
                </div>
              </div>
            </div>

            <div style={{ width:600 }} class="card">
              <header class="card-header">
                <p class="card-header-title">
                  What are ENS Subdomains?
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
              </header>
              <div class="card-content">
                <div class="content">
                  Subdomains let you register a sub-domain on a main domain. For example, dev.eth is a main domain. But you can register a subdomain like "john.dev.eth". This can come in handy when there are no readable names available that match your needs, or when you're registering different aspects of your name. Since subdomains can be anything, you can register "wallet.joe.dev.eth" for your wallet, "web.joe.dev.eth" for the website about crypto that you're running, "kitties.joe.dev.eth" for the address you use for only CryptoKitties, "trade.joe.dev.eth" for a trading account so you can just give it to auditors or accountants, etc.
                </div>
              </div>
            </div>

            <div style={{ width:600 }} class="card">
              <header class="card-header">
                <p class="card-header-title">
                  Why would I use a subdomain?
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
              </header>
              <div class="card-content">
                <div class="content">
                  Subdomains are able to do anything main domains can do, with one extra trick: whereas main domains require the owner to pay rent (e.g. dev.eth costs 3.4 ether per year!), subdomains are only paid once! This means your claimed subdomain name is yours forever.
                </div>
              </div>
            </div>

            <div style={{ width:600 }} class="card">
              <header class="card-header">
                <p class="card-header-title">
                  How do I list my domain here?
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
              </header>
              <div class="card-content">
                <div class="content">
                  If you have a domain and would like to sell subdomains of it on this site. Visit registration page to register for selling subdomain.
                </div>
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Landing;
