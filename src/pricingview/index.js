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
import PersonList from "./personlist";

function PricingView({ pricingview, fetchBudgetPricing }) {
  const [byCustomer, setByCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    fetchBudgetPricing({ byCustomer: false });
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

  return (
    <>
      <CustomerList
        customers={customers}
        selectedCustomer={selectedCustomer}
        selectedPerson={selectedPerson}
        updateCPP={updateCPP}
      />
      <PersonList
        persons={persons}
        selectedCustomer={selectedCustomer}
        selectedPerson={selectedPerson}
        updateCPP={updateCPP}
      />
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
