import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { connect } from "react-redux";

import { fetchBudgetPricing } from "../actions";

function PricingView({ data, fetchBudgetPricing }) {
  useEffect(() => {
    fetchBudgetPricing({});
  }, []);

  return <div>hello</div>;
}

function mapStateToProps(state) {
  const props = {
    error: state.error,
    data: state.pricingview
  };
  return props;
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBudgetPricing: (params) => dispatch(fetchBudgetPricing(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PricingView);
