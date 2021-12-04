import * as api from "../api";
import { fetchError } from "./common";

/*
 * Reports
 */

export function getReportPreview() {
  return dispatch => {
    api
      .getReportPreview()
      .then(resp => {
        dispatch(fetchReportPreviewSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchReportPreview(params) {
  return dispatch => {
    dispatch(fetchReportPreviewSucceeded(params));
    api
      .postReportPreview(params)
      .then(resp => {
        dispatch(fetchReportPreviewSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchReportPreviewSucceeded(data) {
  return {
    type: "FETCH_REPORT_PREVIEW_SUCCEEDED",
    payload: { reportview: data, error: null }
  };
}

export function getExcel(params) {
  return dispatch => {
    api
      .getExcel(params)
      .then(response => {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          // this is for IE 11
          window.navigator.msSaveOrOpenBlob(response.data, "report.xlsx");
        } else {
          // for other browsers
          const url = window.URL.createObjectURL(response.data);
          const link = document.createElement("a");
          document.body.appendChild(link);
          link.href = url;
          link.setAttribute("download", "report.xlsx");
          link.click();
          window.URL.revokeObjectURL(url);
        }
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}
