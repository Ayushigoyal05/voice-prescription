import React from "react";
import { Container,Row,Col} from "shards-react";




export default class CreateApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }


  render(){
    return(
      <div>
        <Container className="main-container">
        <Row>
        <Col sm="12" md="6">
        </Col>
        <Col sm="12" md="6">
        </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

