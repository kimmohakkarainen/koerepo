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

export default function CustomerPersonRow({ p, c, selectedPerson, updateCPP }) {
  return (
    <Card key={p.personId}>
      <Card.Header>
        <Row
          key={p.personId}
          onClick={() => updateCPP(c.customerId, p.personId, null, null)}
        >
          <Col>{p.fullname}</Col>
          <Col>{p.sellPrice}</Col>
          <Col>
            {selectedPerson === p.personId && <Spinner animation="grow" />}
          </Col>
        </Row>
      </Card.Header>
      <Collapse in={false}>
        <Card.Body key={p.personId} />
      </Collapse>
    </Card>
  );
}
