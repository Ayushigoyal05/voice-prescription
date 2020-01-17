import React from "react";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  Button,
  Container,
  Row,
  Col
} from "shards-react";




export default class ManageAccess extends React.Component {
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


  render(){
    return(
      <div>
        <Container className="main-container">
        <Row>
        
              {
                this.state.items.map(item =>
                  
                  <Col sm="12" md="4">
                                    

                  <Card style={{ maxWidth: "300px" }} key={item.id}>
                    <CardHeader>Type Of Doctor:</CardHeader>
                    <CardImg style={{Height: "30px;"}}  src="https://qtxasset.com/styles/breakpoint_sm_default_480px_w/s3/2017-03/docpatient.jpg?GvE6pAWrtlrDAAkYFQVjDPm.hWRmT30j&itok=JptFnnhntps://place-hold.it/300x200" />
                    <CardBody>
                      <CardTitle>Fee:</CardTitle>
                      <p>MBBS,MD</p>
                      <Button>Grant Access &rarr;</Button>
                    </CardBody>
                   
                  </Card>
                  < br />
                  < br />

                  </Col>
                )
              }
          </Row>
        </Container>
      </div>
    );
  }
}

