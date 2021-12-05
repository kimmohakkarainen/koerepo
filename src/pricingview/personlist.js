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

import PersonRow from "./personrow";
import PersonCustomerRow from "./personcustomerrow";
import PersonCustomerRowFull from "./personcustomerrowfull";

export default function PersonList({
  persons,
  selectedCustomer,
  selectedPerson,
  updateCPP
}) {
  return (
    <>
      {persons.map((p) => {
        if (p.customers == null) {
          return (
            <PersonRow
              p={p}
              selectedPerson={selectedPerson}
              updateCPP={updateCPP}
            />
          );
        } else {
          return (
            <Card key={p.personId}>
              <Card.Header onClick={() => updateCPP(null, null, null, null)}>
                <Row>
                  <Col>{p.fullName}</Col>
                  <Col>
                    {selectedPerson !== p.personId && (
                      <Spinner animation="grow" />
                    )}
                  </Col>
                </Row>
              </Card.Header>
              <Collapse in={true}>
                <Card.Body key={p.personId}>
                  <Container>
                    {p.customers.map((c) => {
                      if (c.projects == null) {
                        return (
                          <PersonCustomerRow
                            c={c}
                            p={p}
                            selectedCustomer={selectedCustomer}
                            updateCPP={updateCPP}
                          />
                        );
                      } else {
                        return (
                          <PersonCustomerRowFull
                            c={c}
                            p={p}
                            selectedCustomer={selectedCustomer}
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
