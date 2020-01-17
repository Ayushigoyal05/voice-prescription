import React from "react";
import { Container, Row, Col } from "shards-react";
import {
  Card,
  CardTitle,
  CardImg,
  CardBody,
  Button
} from "shards-react";
export default class UserPrescriptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://reqres.in/api/unknown")
      .then(res => res.json()
      )
      .then(
        (result) => {
          console.log(result.data);
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    return (
      <div>
        <Container className="main-container">
          <Row>
              {
                this.state.items.map(item =>
                  <Col sm="12" md="4">
                                    
                  <Card style={{ maxWidth: "300px"}} key={item.id}>
  
                    <CardImg style={{Height: "30px;"}} src="https://rscbayarea.com/app/uploads/photo_African-American-woman-talking-with-Asian-doctor2-400x399.jpg" />
                    <CardBody>
                      <CardTitle>Illness Detected:</CardTitle>
                      <p>Read Your Prescription</p>
                      <Button>Click Me &rarr;</Button>
                    </CardBody>
                  </Card>
                  <br />
          <br />

                  </Col>
                )
              }
          </Row>
          
        </Container>
      </div>
    );
  }
}

