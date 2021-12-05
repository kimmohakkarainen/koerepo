import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import {
  Card,
  ListGroup,
  Container,
  Row,
  Col,
  Spinner,
  InputGroup,
  FormControl
} from "react-bootstrap";
import { connect } from "react-redux";

import { fetchBudgetPricing } from "../actions";

function PricingView({ pricingview, fetchBudgetPricing }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    fetchBudgetPricing({ byCustomer: true });
  }, []);

  const customers = pricingview.customers == null ? [] : pricingview.customers;
  const persons = pricingview.persons == null ? [] : pricingview.persons;

  /*  console.log(customers);
  console.log(persons); */

  function selectCustomer(customerId) {
    setSelectedCustomer(customerId);
    fetchBudgetPricing({ byCustomer: true, customerId: customerId });
  }

  function selectCustomerPerson(customerId, personId, sellPrice) {
    setSelectedCustomer(customerId);
    setSelectedPerson(personId);
    fetchBudgetPricing({
      byCustomer: true,
      customerId: customerId,
      personId: personId,
      sellPrice: sellPrice
    });
  }

  return (
    <>
      {customers.map((c) => {
        if (c.persons == null) {
          return (
            <Card key={c.customerId}>
              <Card.Header onClick={() => selectCustomer(c.customerId)}>
                {c.name}
                {selectedCustomer === c.customerId && (
                  <Spinner animation="grow" />
                )}
              </Card.Header>
            </Card>
          );
        } else {
          return (
            <Card key={c.customerId}>
              <Card.Header onClick={() => selectCustomer(null)}>
                {c.name}
                {selectedCustomer !== c.customerId && (
                  <Spinner animation="grow" />
                )}
              </Card.Header>
              <Card.Body key={c.customerId}>
                <Container>
                  {c.persons.map((p) => {
                    if (p.projects == null) {
                      return (
                        <Row
                          key={p.personId}
                          onClick={() =>
                            selectCustomerPerson(c.customerId, p.personId)
                          }
                        >
                          <Col>{p.fullname}</Col>
                          <Col>{p.sellPrice}</Col>
                        </Row>
                      );
                    } else {
                      return (
                        <Card key={p.personId}>
                          <Card.Header
                            key={p.personId}
                            onClick={() => selectCustomer(c.customerId)}
                          >
                            <Col>{p.fullname}</Col>
                            <Col>
                              <FormControl value={p.sellPrice} />
                            </Col>
                          </Card.Header>
                          <Card.Body>
                            {p.projects.map((pp) => {
                              return (
                                <Row>
                                  <Col>{pp.name}</Col>
                                  <Col>
                                    <FormControl value={pp.sellPrice} />
                                  </Col>
                                </Row>
                              );
                            })}
                          </Card.Body>
                        </Card>
                      );
                    }
                  })}
                </Container>
              </Card.Body>
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
  const props = {
    error: state.error,
    data: state.pricingview
  };
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBudgetPricing: (params) => dispatch(fetchBudgetPricing(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PricingView);
