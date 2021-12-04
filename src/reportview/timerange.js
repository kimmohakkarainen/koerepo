import React, { Component } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Row,
  Col,
  Form
} from "react-bootstrap";
import { DateTimePicker } from "react-widgets";

class TimeRange extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <strong>Time Range</strong>
        </Card.Header>
        <Card.Body>
          <Container>
            <Form.Group as={Row} controlId="begin">
              <Form.Label column sm="2">
                <strong>Begin</strong>
              </Form.Label>
              <Col sm="4">
                <DateTimePicker
                  time={false}
                  value={this.props.begin}
                  onChange={begin =>
                    this.props.onChange({ begin: begin, end: this.props.end })
                  }
                />
              </Col>
              <Form.Label column sm="2">
                <strong>End</strong>
              </Form.Label>
              <Col sm="4">
                <DateTimePicker
                  time={false}
                  value={this.props.end}
                  onChange={end =>
                    this.props.onChange({ begin: this.props.begin, end: end })
                  }
                />
              </Col>
            </Form.Group>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

export default TimeRange;
