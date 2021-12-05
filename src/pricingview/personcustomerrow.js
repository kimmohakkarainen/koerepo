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

export default function PersonCustomerRow({
  p,
  c,
  selectedCustomer,
  updateCPP
}) {
  return (
    <Card key={c.customerId}>
      <Card.Header>
        <Row
          key={c.customerId}
          onClick={() => updateCPP(c.customerId, p.personId, null, null)}
        >
          <Col>{c.name}</Col>
          <Col>{c.sellPrice}</Col>
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
