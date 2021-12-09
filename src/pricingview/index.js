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
  Collapse,
  Tabs,
  Tab
} from "react-bootstrap";
import { connect } from "react-redux";

import { fetchBudgetPricing } from "../actions";

import CustomerRow from "./customerrow";
import CustomerPersonRow from "./customerpersonrow";
import CustomerPersonRowFull from "./customerpersonrowfull";
import CustomerList from "./customerlist";
import PersonList from "./personlist";

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

  function switchTab(key) {
    const selection = key === "customer" ? true : false;
    setByCustomer(selection);
    fetchBudgetPricing({
      byCustomer: selection,
      customerId: selectedCustomer,
      personId: selectedPerson,
      projectId: null,
      sellPrice: null
    });
  }

  return (
    <Tabs
      activeKey={byCustomer ? "customer" : "person"}
      onSelect={(k) => switchTab(k)}
      id="uncontrolled-tab-example"
    >
      <Tab eventKey="customer" title="Prices by Customer">
        <CustomerList
          customers={customers}
          selectedCustomer={selectedCustomer}
          selectedPerson={selectedPerson}
          updateCPP={updateCPP}
        />
      </Tab>
      <Tab eventKey="person" title="Prices by Person">
        <PersonList
          persons={persons}
          selectedCustomer={selectedCustomer}
          selectedPerson={selectedPerson}
          updateCPP={updateCPP}
        />
      </Tab>
    </Tabs>
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
