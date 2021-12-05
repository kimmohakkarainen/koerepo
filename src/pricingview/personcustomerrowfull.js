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

export default function PersonCustomerRowFull({
  c,
  p,
  selectedCustomer,
  updateCPP
}) {
  return (
    <Card key={c.customerId}>
      <Card.Header>
        <Row>
          <Col onClick={() => updateCPP(null, p.personId, null, null)}>
            {c.name}
          </Col>
          <Col>
            <FormControl
              value={c.sellPrice}
              onChange={(e) =>
                updateCPP(c.customerId, p.personId, null, e.target.value)
              }
            />
          </Col>
          <Col>
            {selectedCustomer !== c.customerId && <Spinner animation="grow" />}
          </Col>
        </Row>
      </Card.Header>
      <Collapse in={true}>
        <Card.Body key={c.customerId}>
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
