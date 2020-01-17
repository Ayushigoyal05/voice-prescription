import React from "react";
import {
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Collapse
} from "shards-react";
import {
  HashRouter,
  NavLink
} from "react-router-dom";

import './index.css'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }

  render() {
    return (
      <div>
      <HashRouter>
      <Navbar type="dark" theme="primary" expand="md" className="navbar-class">
       
        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink to="/medical-history" className="nav-link">
              Medical History
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/patient-prescriptions" className="nav-link">
              All Prescriptions
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/doctors-dashboard" className="nav-link">
              Doctors Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/add-prescription" className="nav-link">
              Add Prescription
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      </HashRouter>
      </div>
    );
  }
}
