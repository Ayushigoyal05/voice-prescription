import React from "react";
import { Container, Row, Col, Card, CardBody, CardHeader, CardTitle, FormInput, Button } from "shards-react";
import { ReactMic } from 'react-mic';

export default class AddPrescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record1: false,
      record2: false,
      downloadLinkURL1: "",
      downloadLinkURL2 : "",
      isMicOnScene1: false,
      isMicOnScene2: false
    };
  }

  startRecording1 = () => {
    this.setState({
      record1: true,  isMicOnScene1: true
    });
  }

  startRecording2 = () => {
    this.setState({
      record2: true,  isMicOnScene2: true
    });
  }

  stopRecording1 = () => {
    this.setState({
      record1: false,
      isMicOnScene1: false
    });
  }

  stopRecording2 = () => {
    this.setState({
      record2: false,
      isMicOnScene2: false
    });
  }

  onData1(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  onData2(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop1 = (blobObject) => {
    this.setState({ downloadLinkURL1: blobObject.blobURL })
  }

  onStop2 = (blobObject) => {
    this.setState({ downloadLinkURL2: blobObject.blobURL })
  }

  render() {
    return (
      <div style={{ fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" }}>

        <Container className="main-container">
          <Row>
            <Col sm="12" md="12">
              <div>
                <h3>Add New Prescription</h3><hr /> <br />
                <Card>
                  <CardHeader>Enter The Details Of Prescription</CardHeader>
                  <CardBody>
                    <CardTitle>Patient's ID</CardTitle>
                    <FormInput name="Id" value={this.state.name} onChange={this.handleInput} />
                    <br/>
                    <CardTitle>User and Illness Details</CardTitle>
                    {
                      this.state.isMicOnScene1 && <ReactMic
                      record={this.state.record1}
                      className="sound-wave1"
                      onStop={this.onStop1}
                      onData={this.onData1}
                      visualSetting="sinewave"
                      audioBitsPerSecond={128000}
                      strokeColor="#0096ef"
                      backgroundColor="#333333" />
                    }
                    <br/>
                    <Button onClick={this.startRecording1}>Start Recording</Button>
                    <Button onClick={this.stopRecording1}>Stop Recording</Button>
                    {/* <a
                    href={this.state.downloadLinkURL}
                    download={`recording.webm`}
                    > Hwwlloo </a> */}
                    <br /><br/>
                    <CardTitle>Medicine Prescription</CardTitle>
                    { this.state.isMicOnScene2 && <ReactMic
                      record={this.state.record2}
                      className="sound-wave2"
                      onStop={this.onStop2}
                      onData={this.onData2}
                      visualSetting="sinewave"
                      audioBitsPerSecond={128000}
                      strokeColor="#0096ef"
                      backgroundColor="#333873" />}
                      <br/>
                    <Button onClick={this.startRecording2}>Start Recording</Button>
                    <Button onClick={this.stopRecording2}>Stop Recording</Button>
                    {/* <a
                    href={this.state.downloadLinkURL}
                    download={`recording.webm`}
                    > Hwwlloo </a> */}
                    <br /> <br />
                    <center><Button theme="success" outline pill>Submit </Button></center>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

