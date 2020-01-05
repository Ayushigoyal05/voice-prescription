import React from "react";
import Store from "../utils/store";
import { Link } from "react-router-dom";

const LeaderboardItem = props => {
  return (
    <div className="card has-background-light" style={{ marginBottom: 18 }}>
      <div className="card-content">
        <div className="level">
          <div className="level-left">
            <div style={{ marginRight: 18 }}>
              <span className="tag is-info is-medium">
                <h2 className="title is-5 has-text-white">{props.index}</h2>
              </span>
            </div>
            <div>
              <h2 className="title is-4">
                <Link to={`/domain/${props.domain.domain_name}`}>
                  {props.domain.domain_name}
                </Link>
              </h2>

              <h2 className="subtitle is-6">
                <strong>Owner:</strong>{" "}
                {Store.shortenEthAddr(props.domain.owner)}
              </h2>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item" style={{ marginRight: 36 }}>
              <h2 className="title is-5">Subdomains:</h2>
              <h2
                className="title is-4 has-text-link"
                style={{ marginLeft: 12 }}
              >
                {props.domain.subdomains.length}
              </h2>
            </div>
            <div className="level-item" style={{ marginRight: 36 }}>
              <div>
                <span className="icon has-text-link is-large">
                  <i className="fab fa-2x fa-ethereum"></i>
                </span>
              </div>
              <div className="title">{props.domain.price}</div>
            </div>
            <div className="level-item">
              <button
                className="button is-danger"
                onClick={e => props.setOpenBuyModal(true, props.domain)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardItem;
