import React from "react";
import SubdomainItem from "./SubdomainItem";
import Web3Service from "../utils/web3";

const ShowBuyingModal = props => {
  return (
    <div>
      <div className={"modal " + (props.open ? "is-active" : null)}>
        <div className="modal-background" onClick={props.close}></div>
        <div className="modal-card">
          <section className="modal-card-body buy_modal">
            <div style={{ marginBottom: 24 }}>
              <center>
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <span
                  class="icon has-text-success"
                  style={{ height: 156, width: 156 }}
                >
                  <i
                    class="far fa-check-circle"
                    style={{ height: 152, width: 152 }}
                  ></i>
                </span>
              </center>
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 18 }}>
              <center>Confirm</center>
            </div>
            <div style={{ marginBottom: 24 }}>
              <center>
                Your registration request for {props.subdomain} has been
                submitted. Confirm to start registration.
              </center>
            </div>
            <div>
              <center>
                <button
                  className="button is-success"
                  style={{ height: 52, width: "56%" }}
                >
                  Close
                </button>
              </center>
            </div>
          </section>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={props.close}
        ></button>
      </div>
    </div>
  );
};

export default ShowBuyingModal;
