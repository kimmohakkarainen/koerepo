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
import CustomerPersonRow from "./customerpersonrow";
import CustomerPersonRowFull from "./customerpersonrowfull";
import CustomerList from "./customerlist";

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
      */

  return (
    <>
      <CustomerList
        customers={customers}
        selectedCustomer={selectedCustomer}
        selectedPerson={selectedPerson}
        updateCPP={updateCPP}
      />

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
