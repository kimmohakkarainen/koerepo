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

export default function CustomerPersonRowFull({
  c,
  p,
  selectedPerson,
  updateCPP
}) {
  return (
    <Card key={p.personId}>
      <Card.Header>
        <Row>
          <Col onClick={() => updateCPP(c.customerId, null, null, null)}>
            {p.fullname}
          </Col>
          <Col>
            <FormControl
              value={p.sellPrice}
              onChange={(e) =>
                updateCPP(c.customerId, p.personId, null, e.target.value)
              }
            />
          </Col>
          <Col>
            {selectedPerson !== p.personId && <Spinner animation="grow" />}
          </Col>
        </Row>
      </Card.Header>
      <Collapse in={true}>
        <Card.Body key={p.personId}>
          {p.projects.map((pp) => {
            return (
              <Row>
                <Col>{pp.name}</Col>
                <Col>
                  <FormControl
                    value={pp.sellPrice}
                    onChange={(e) =>
                      updateCPP(
                        c.customerId,
                        p.personId,
                        pp.projectId,
                        e.target.value
                      )
                    }
                  />
                </Col>
              </Row>
            );
          })}
        </Card.Body>
      </Collapse>
    </Card>
  );
}
