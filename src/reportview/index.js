import React, { Component } from "react";
import { connect } from "react-redux";

import {
    Alert,
    Button,
    Card,
    Container,
    Row,
    Col,
    Form,
    Spinner
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

import Moment from "moment";
import momentLocalizer from "react-widgets-moment";

import { getReportPreview, fetchReportPreview, getExcel } from "../actions/";
import TimeRange from "./timerange";
import Filter from "./filter";
import { columnsProp } from "./columnsprop";

Moment.locale("fi");
momentLocalizer();

class ReportView extends Component {
    constructor(props) {
        super(props);

        this.onChangeTimeRange = this.onChangeTimeRange.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.postParametersAndGetExcel = this.postParametersAndGetExcel.bind(this);
    }

    onChangeTimeRange(range) {
        const parameters = {
                beginDay: Moment(range.begin).format("YYYY-MM-DD"),
                endDay: Moment(range.end).format("YYYY-MM-DD"),
                customerFilter: this.props.reportview.customerFilter,
                projectFilter: this.props.reportview.projectFilter,
                personFilter: this.props.reportview.personFilter,
                customerOptions: this.props.reportview.customerOptions,
                personOptions: this.props.reportview.personOptions,
                projectOptions: this.props.reportview.projectOptions
        };
        this.props.dispatch(fetchReportPreview(parameters));
    }

    onChangeFilter(filter) {
        const parameters = {
                beginDay: this.props.reportview.beginDay,
                endDay: this.props.reportview.endDay,
                customerFilter: filter.customerFilter,
                projectFilter: filter.projectFilter,
                personFilter: filter.personFilter,
                customerOptions: this.props.reportview.customerOptions,
                personOptions: this.props.reportview.personOptions,
                projectOptions: this.props.reportview.projectOptions
        };
        this.props.dispatch(fetchReportPreview(parameters));
    }

    postParametersAndGetExcel() {
        const parameters = {
                beginDay: this.props.reportview.beginDay,
                endDay: this.props.reportview.endDay,
                customerFilter: this.props.reportview.customerFilter,
                personFilter: this.props.reportview.personFilter,
                projectFilter: this.props.reportview.projectFilter
        };
        this.props.dispatch(getExcel(parameters));
    }

    componentDidMount() {
        this.props.dispatch(getReportPreview());
    }

    render() {
        const begin = Moment(this.props.reportview.beginDay).toDate();
        const end = Moment(this.props.reportview.endDay).toDate();
        const data = this.props.reportview;
        const preview = data == null || data.preview == null ? null : data.preview;
        return (
          <div>
              <Card body>
                <strong>Reporting</strong>
              </Card>
             <TimeRange begin={begin} end={end} onChange={this.onChangeTimeRange} />
             <Filter
                value={data}
                onChange={this.onChangeFilter}
                customerOptions={data.customerOptions}
                personOptions={data.personOptions}
                projectOptions={data.projectOptions} />
            <Card>
                <Card.Header>
                    <strong>Preview</strong>
                </Card.Header>
                { preview == null && <Spinner animation="grow" size="lg" /> }
                { preview != null && 		
                <BootstrapTable
                    bordered
                    striped
                    bootstrap4
                    keyField="id"
                    data={preview} columns={columnsProp} /> }
           </Card>
           <Card body>
              <Button onClick={this.postParametersAndGetExcel}>
                  Generate Excel Report
              </Button>
          </Card>
        </div>
      );
    }
}

function mapStateToProps(state) {
    const props = {
            error: state.error,
            reportview: state.reportview
    };
    return props;
}

export default connect(mapStateToProps)(ReportView);
