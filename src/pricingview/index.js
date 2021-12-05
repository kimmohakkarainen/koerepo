import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { Card, ListGroup, Container, Row, Col, Spinner } from "react-bootstrap";
import { connect } from "react-redux";

import { fetchBudgetPricing } from "../actions";

function PricingView({ pricingview, fetchBudgetPricing }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchBudgetPricing({ byCustomer: true });
  }, []);

  const customers = pricingview.customers == null ? [] : pricingview.customers;
  const persons = pricingview.persons == null ? [] : pricingview.persons;

  /*  console.log(customers);
  console.log(persons); */

  function selectCustomer(customerId) {
    setSelectedCustomer(customerId);
    fetchBudgetPricing({ byCustomer: true, customerId, customerId });
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
