import * as api from "../api";
import { fetchError } from "./common";
export * from "./admin";
export * from "./report";
export * from "./flexhour";
export * from "./vacation";

export function postLogout() {
  return (dispatch) => {
    api
      .postLogout()
      .then((resp) => {
        console.log("logout successfull");
        window.location.href = "/logout";
      })
      .catch((error) => {
        console.log("logout error");
        window.location.href = "/logout";
      });
  };
}

export function fetchDay(date) {
  return (dispatch) => {
    api
      .getDay(date)
      .then((resp) => {
        dispatch(fetchDaySucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}

export function postDay(params) {
  return (dispatch) => {
    api
      .postDay(params)
      .then((resp) => {
        dispatch(fetchDaySucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}
export function fetchDaySucceeded(data) {
  return {
    type: "FETCH_DAY_SUCCEEDED",
    payload: { dayview: data, error: null }
  };
}

/*
 * Week view
 */

export function fetchWeek(date) {
  return (dispatch) => {
    api
      .getWeek(date)
      .then((resp) => {
        dispatch(fetchWeekSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}

export function postWeek(params) {
  return (dispatch) => {
    api
      .postWeek(params)
      .then((resp) => {
        dispatch(fetchWeekSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}
export function fetchWeekSucceeded(data) {
  return {
    type: "FETCH_WEEK_SUCCEEDED",
    payload: { weekview: data, error: null }
  };
}

/*
 * Month view
 */

export function fetchMonth(date) {
  return (dispatch) => {
    api
      .getMonth(date)
      .then((resp) => {
        dispatch(fetchMonthSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchMonthSucceeded(data) {
  return {
    type: "FETCH_MONTH_SUCCEEDED",
    payload: { monthview: data, error: null }
  };
}

/*
 * Customer view
 */

export function fetchCustomers() {
  return (dispatch) => {
    api
      .getCustomers()
      .then((resp) => {
        dispatch(fetchCustomersSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}

export function postCustomer(data) {
  return (dispatch) => {
    api
      .postCustomer(data)
      .then((resp) => {
        dispatch(fetchCustomersSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchCustomersSucceeded(data) {
  return {
    type: "FETCH_CUSTOMERS_SUCCEEDED",
    payload: { customerview: data, error: null }
  };
}

export function fetchCustomerProjects(customerId) {
  return (dispatch) => {
    api
      .getCustomer(customerId)
      .then((resp) => {
        dispatch(fetchCustomerProjectsSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}

export function postCustomerProject(data) {
  return (dispatch) => {
    api
      .postProject(data)
      .then((resp) => {
        dispatch(fetchCustomerProjectsSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchCustomerProjectsSucceeded(data) {
  return {
    type: "FETCH_CUSTOMER_PROJECTS_SUCCEEDED",
    payload: { projectview: data, error: null }
  };
}

/*
 * Graphs
 */

export function fetchGraphPreview(params) {
  return (dispatch) => {
    dispatch(fetchGraphPreviewSucceeded(params));
    api
      .postGraphPreview(params)
      .then((resp) => {
        dispatch(fetchGraphPreviewSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchGraphPreviewSucceeded(data) {
  return {
    type: "FETCH_GRAPH_PREVIEW_SUCCEEDED",
    payload: { graphview: data, error: null }
  };
}

/*
 * Budget graph
 */

export function fetchBudgetPreview(params) {
  return (dispatch) => {
    dispatch(fetchBudgetPreviewSucceeded(params));
    api
      .postBudgetPreview(params)
      .then((resp) => {
        dispatch(fetchBudgetPreviewSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchBudgetPreviewSucceeded(data) {
  return {
    type: "FETCH_BUDGET_PREVIEW_SUCCEEDED",
    payload: { budgetview: data, error: null }
  };
}

export function fetchBudgetPricing(params) {
  return (dispatch) => {
    /* dispatch(fetchBudgetPricingSucceeded(params)); */
    api
      .postBudgetPricing(params)
      .then((resp) => {
        dispatch(fetchBudgetPricingSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchBudgetPricingSucceeded(data) {
  return {
    type: "FETCH_BUDGET_PRICING_SUCCEEDED",
    payload: { pricingview: data, error: null }
  };
}

/*
 * Who Am I and Preferences
 */

export function fetchWhoAmI(params) {
  return (dispatch) => {
    api
      .getWhoAmI()
      .then((resp) => {
        dispatch(fetchWhoAmISucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}

export function postPreferences(params) {
  return (dispatch) => {
    api
      .postPreferences(params)
      .then((resp) => {
        dispatch(fetchWhoAmISucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchWhoAmISucceeded(data) {
  return {
    type: "WHOAMI_SUCCEEDED",
    payload: { whoami: data, error: null }
  };
}

/*
 * Project Preferences
 */

export function postProjectPreferences(params) {
  return (dispatch) => {
    /* ensure there is no previous results available */
    dispatch(fetchProjectPreferencesSucceeded([]));
    api
      .postProjectPreferences(params)
      .then((resp) => {
        dispatch(fetchProjectPreferencesSucceeded(resp.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchProjectPreferencesSucceeded(data) {
  return {
    type: "FETCH_PROJECT_PREFERENCES_SUCCEEDED",
    payload: { projectprefview: data, error: null }
  };
}
