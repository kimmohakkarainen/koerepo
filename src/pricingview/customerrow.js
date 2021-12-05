import React from "react";
import {
  Card,
  ListGroup,
  Container,
  Row,
  Col,
  Spinner,
  InputGroup,
  FormControl,
  Collapse
} from "react-bootstrap";

export default function CustomerRow({ c, selectedCustomer, updateCPP }) {
  return (
    <Card key={c.customerId}>
      <Card.Header onClick={() => updateCPP(c.customerId, null, null, null)}>
        <Row>
          <Col>{c.name}</Col>
          <Col>
            {selectedCustomer === c.customerId && <Spinner animation="grow" />}
          </Col>
        </Row>
      </Card.Header>
      <Collapse in={false}>
        <Card.Body key={c.customerId} />
      </Collapse>
    </Card>
  );
}
