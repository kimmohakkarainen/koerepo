import React, { useEffect } from "react";
import { connect } from "react-redux";

import Moment from "moment";
import momentLocalizer from "react-widgets-moment";

import { getGraphPreview, fetchGraphPreview } from "../actions/";
import TimeRange from "../reportview/timerange";
import Filter from "../reportview/filter";

Moment.locale("fi");
momentLocalizer();

function FilterPanel({
  fetchGraphPreview,
  beginDay,
  endDay,
  customerFilter,
  customerOptions,
  personFilter,
  personOptions,
  projectFilter,
  projectOptions
}) {
  useEffect(() => {
	  fetchGraphPreview({});
  }, []);

  function onChangeTimeRange(range) {
    const parameters = {
      beginDay: Moment(range.begin).format("YYYY-MM-DD"),
      endDay: Moment(range.end).format("YYYY-MM-DD"),
      customerFilter: customerFilter,
      projectFilter: projectFilter,
      personFilter: personFilter
    };
    fetchGraphPreview(parameters);
  }

  function onChangeFilter(filter) {
    const parameters = {
      beginDay: Moment(beginDay).format("YYYY-MM-DD"),
      endDay: Moment(endDay).format("YYYY-MM-DD"),
      customerFilter: filter.customerFilter,
      projectFilter: filter.projectFilter,
      personFilter: filter.personFilter
    };
    fetchGraphPreview(parameters);
  }

  const begin = Moment(beginDay).toDate();
  const end = Moment(endDay).toDate();
  const value = {
    customerFilter: customerFilter,
    personFilter: personFilter,
    projectFilter: projectFilter
  };

  return (
    <div>
      <TimeRange begin={begin} end={end} onChange={onChangeTimeRange} />
      <Filter
        value={value}
        customerOptions={customerOptions}
        personOptions={personOptions}
        projectOptions={projectOptions}
        onChange={onChangeFilter}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return state.graphview;
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGraphPreview: params => dispatch(fetchGraphPreview(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterPanel);
