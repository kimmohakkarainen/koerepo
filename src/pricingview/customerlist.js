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

import CustomerRow from "./customerrow";
import CustomerPersonRow from "./customerpersonrow";
import CustomerPersonRowFull from "./customerpersonrowfull";

export default function CustomerList({
  customers,
  selectedCustomer,
  selectedPerson,
  updateCPP
}) {
  return (
    <>
      {customers.map((c) => {
        if (c.persons == null) {
          return (
            <CustomerRow
              c={c}
              selectedCustomer={selectedCustomer}
              updateCPP={updateCPP}
            />
          );
        } else {
          return (
            <Card key={c.customerId}>
              <Card.Header onClick={() => updateCPP(null, null, null, null)}>
                <Row>
                  <Col>{c.name}</Col>
                  <Col>
                    {selectedCustomer !== c.customerId && (
                      <Spinner animation="grow" />
                    )}
                  </Col>
                </Row>
              </Card.Header>
              <Collapse in={true}>
                <Card.Body key={c.customerId}>
                  <Container>
                    {c.persons.map((p) => {
                      if (p.projects == null) {
                        return (
                          <CustomerPersonRow
                            c={c}
                            p={p}
                            selectedPerson={selectedPerson}
                            updateCPP={updateCPP}
                          />
                        );
                      } else {
                        return (
                          <CustomerPersonRowFull
                            c={c}
                            p={p}
                            selectedPerson={selectedPerson}
                            updateCPP={updateCPP}
                          />
                        );
                      }
                    })}
                  </Container>
                </Card.Body>
              </Collapse>
            </Card>
          );
        }
      })}
    </>
  );
}
