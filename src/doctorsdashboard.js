import React from "react";
import { 
  Container,
  Row,Col, CardBody, FormInput, Button ,Card, CardHeader,
  Modal, ModalBody, ModalFooter, ModalHeader
} from "shards-react";



export default class DoctorsDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      patientid: '',
      patientid2: '',
      open: false
    };       
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  handleInput = (e) => {
    console.log(e);
    
    this.setState({ patientid: e.target.value })
  }

  handleInput2 = (e) => {
    console.log(this.state);
    
    this.setState({ patientid2: e.target.value })
  }
  
  requestUserAccess = () => {
    if(this.state.patientid2 !== '') {
      fetch('https://reqres.in/api/users', {
        method: 'post',
        body: {
         "name": this.state.patientid2,
          "job": 'morpheus'
        }
       })
       .then( res => res.json() )
       .then (
         (result) => {
          this.toggle();
          console.log(result);
         },
         (error) => {
          console.log(error);
         }
       )
    }
  }

  getPatientDetails = () => {
    fetch("https://reqres.in/api/unknown")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  
  render(){
    return(
      <div>
        <center>
        <Container className="main-container">
        <Row style= {{ maxWidth: 800 }}>

        <Col md="12" style={{ marginBottom: 24 }}>
          <Card>
          <CardHeader> <h3>Get Patient Medical Records</h3> </CardHeader>
            <CardBody>
            <FormInput name="Patient ID" value={this.state.patientid} onChange={this.handleInput} />
            <br/>
            <Button onClick={this.getPatientDetails}>Submit 
            <span className="icon">
                      <i className="fas fa-arrow-right"></i>
                    </span>
            </Button>
            {
              this.state.items ? (
                <div>
                  {this.state.items.map(item => (
                    <div key={item.id}>
                      <p>Name :- {item.name}</p>
                      <p>Year :- {item.year}</p>
                      <p>Pantone Value :- {item.pantone_value}</p>
                    </div>
                  ))}
                </div>
              ) : null
            }
            </CardBody>
          </Card>
        </Col>
        <br/> <br/>
        <Col md="12">
          <Card>
          <CardHeader><h3>Request Medical Data Access</h3></CardHeader>
            <CardBody>
            <FormInput name="Patient ID" value={this.state.patientid2} onChange={this.handleInput2} />
            <br/>
            <Button onClick={this.requestUserAccess}>Request
            <span className="icon">
                      <i className="fas fa-arrow-right"></i>
                    </span>
            </Button>
            </CardBody>
          </Card>
        </Col>
        
        <Modal open={this.state.open} toggle={this.toggle}>
          <ModalHeader>Header</ModalHeader>
          <ModalBody>👋 You Have successfully requested user access</ModalBody>
        </Modal>
        </Row>
        </Container>
        </center>
      </div>
    );
  }
}


