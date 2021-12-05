import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
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
import { connect } from "react-redux";

import { fetchBudgetPricing } from "../actions";

import CustomerRow from "./customerrow";

function PricingView({ pricingview, fetchBudgetPricing }) {
  const [byCustomer, setByCustomer] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    fetchBudgetPricing({ byCustomer: true });
  }, []);

  const customers = pricingview.customers == null ? [] : pricingview.customers;
  const persons = pricingview.persons == null ? [] : pricingview.persons;

  function updateCPP(customerId, personId, projectId, sellPrice) {
    setSelectedCustomer(customerId);
    setSelectedPerson(personId);
    fetchBudgetPricing({
      byCustomer: byCustomer,
      customerId: customerId,
      personId: personId,
      projectId: projectId,
      sellPrice: sellPrice
    });
  }

  /*
          return (
            <Card key={c.customerId}>
              <Card.Header
                onClick={() => updateCPP(c.customerId, null, null, null)}
              >
                {c.name}
                {selectedCustomer === c.customerId && (
                  <Spinner animation="grow" />
                )}
              </Card.Header>
              <Collapse in={false}>
                <Card.Body key={c.customerId} />
              </Collapse>
            </Card>
          );

*/

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
                {c.name}
                {selectedCustomer !== c.customerId && (
                  <Spinner animation="grow" />
                )}
              </Card.Header>
              <Collapse in={true}>
                <Card.Body key={c.customerId}>
                  <Container>
                    {c.persons.map((p) => {
                      if (p.projects == null) {
                        return (
                          <Card key={p.personId}>
                            <Card.Header>
                              <Row
                                key={p.personId}
                                onClick={() =>
                                  updateCPP(
                                    c.customerId,
                                    p.personId,
                                    null,
                                    null
                                  )
                                }
                              >
                                <Col>{p.fullname}</Col>
                                <Col>{p.sellPrice}</Col>
                                <Col>
                                  {selectedPerson === p.personId && (
                                    <Spinner animation="grow" />
                                  )}
                                </Col>
                              </Row>
                            </Card.Header>
                            <Collapse in={false}>
                              <Card.Body key={p.personId} />
                            </Collapse>
                          </Card>
                        );
                      } else {
                        return (
                          <Card key={p.personId}>
                            <Card.Header>
                              <Row>
                                <Col
                                  onClick={() =>
                                    updateCPP(c.customerId, null, null, null)
                                  }
                                >
                                  {p.fullname}
                                </Col>
                                <Col>
                                  <FormControl
                                    value={p.sellPrice}
                                    onChange={(e) =>
                                      updateCPP(
                                        c.customerId,
                                        p.personId,
                                        null,
                                        e.target.value
                                      )
                                    }
                                  />
                                </Col>
                                <Col>
                                  {selectedPerson !== p.personId && (
                                    <Spinner animation="grow" />
                                  )}
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
                    })}
                  </Container>
                </Card.Body>
              </Collapse>
            </Card>
          );
        }
      })}
      {persons.map((p) => {
        return <div>{p.fullname}</div>;
      })}
    </>
  );
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBudgetPricing: (params) => dispatch(fetchBudgetPricing(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PricingView);
