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

export default function PersonRow({ p, selectedPerson, updateCPP }) {
  return (
    <Card key={p.personId}>
      <Card.Header onClick={() => updateCPP(null, p.personId, null, null)}>
        <Row>
          <Col>{p.fullname}</Col>
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
