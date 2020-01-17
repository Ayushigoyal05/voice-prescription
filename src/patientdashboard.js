import React from "react";
import { Container, Row, Col } from "shards-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
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
                  <Col sm="12" md="3">
                  <Card style={{ maxWidth: "300px" }} key={item.id}>
                    <CardHeader>Card header</CardHeader>
                    <CardImg src="https://place-hold.it/300x200" />
                    <CardBody>
                      <CardTitle>Lorem Ipsum</CardTitle>
                      <p>Lorem ipsum dolor sit amet.</p>
                      <Button>Read more &rarr;</Button>
                    </CardBody>
                    <CardFooter>Card footer</CardFooter>
                  </Card>
                  </Col>
                )
              }
          </Row>
        </Container>
      </div>
    );
  }
}

