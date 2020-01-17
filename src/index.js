// Imports -----------------------------
import React from 'react';
import ReactDOM from 'react-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import { Container, Row, Col, FormInput, Button ,Card,CardHeader,CardTitle,CardBody,CardFooter, } from "shards-react";
import {
  Route,
  HashRouter
} from "react-router-dom";

import './index.css';
import NavBar from './Navbar';
import AddPrescription from './addprescription'
import DoctorsDashboard from './doctorsdashboard';
import ManageAccess from './manageaccess'
import UserPrescriptions from './patientdashboard';

// -------------------------------------

class Main extends React.Component {

  render(){

    return(
      <div>
      <NavBar />
      <HashRouter>
        <Route path="/add-prescription" component={AddPrescription}/>
        <Route path="/patient-prescriptions" component={UserPrescriptions}/>
        <Route path="/doctors-dashboard" component={DoctorsDashboard}/>
        <Route path="/manage-access" component={ManageAccess}/>
      </HashRouter>
      </div>
    );
  }
}


ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
