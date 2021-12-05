import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { Card, ListGroup, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import { fetchBudgetPricing } from "../actions";

function PricingView({ pricingview, fetchBudgetPricing }) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    fetchBudgetPricing({ byCustomer: true, customerId: 1 });
  }, []);

  const customers = pricingview.customers == null ? [] : pricingview.customers;
  const persons = pricingview.persons == null ? [] : pricingview.persons;

  console.log(customers);
  console.log(persons);

  return (
    <>
      {customers.map((c) => {
        if (c.persons == null) {
          return (
            <Card>
              <Card.Header>{c.name}</Card.Header>
            </Card>
          );
        } else {
          return (
            <Card>
              <Card.Header>{c.name}</Card.Header>
              <Card.Body>
                <Container>
                  {c.persons.map((p) => {
                    return (
                      <Row>
                        <Col>{p.fullname}</Col>
                        <Col>{p.sellPrice}</Col>
                      </Row>
                    );
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
