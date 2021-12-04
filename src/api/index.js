import { client, excelClient } from "./client.js";
export * from "./adminapi.js";
export * from "./flexapi.js";
export * from "./vacationapi.js";

export function postLogout() {
  return client.post("/logout");
}

export function getDay(datestr) {
  if (datestr == null) {
    return client.get("/rest/day");
  } else {
    return client.get("/rest/day/" + datestr);
  }
}

export function postDay(params) {
  return client.post("/rest/day", params);
}

export function getWeek(datestr) {
  if (datestr == null) {
    return client.get("/rest/week");
  } else {
    return client.get("/rest/week/" + datestr);
  }
}

export function postWeek(params) {
  return client.post("/rest/week", params);
}

export function getMonth(datestr) {
  if (datestr == null) {
    return client.get("/rest/month");
  } else {
    return client.get("/rest/month/" + datestr);
  }
}

/*
 * Customer handling
 */

export function getCustomers() {
  return client.get("/rest/customers");
}

export function getCustomer(customerId) {
  return client.get("/rest/customer/" + customerId);
}

export function postCustomer(params) {
  return client.post("/rest/customer", params);
}

export function postProject(params) {
  return client.post("/rest/project", params);
}

/*
 * Report preview
 */

export function getReportPreview(params) {
  return client.get("/rest/admin/report/preview");
}

export function postReportPreview(params) {
  return client.post("/rest/admin/report/preview", params);
}

/*
 * Graph preview
 */

export function postGraphPreview(params) {
  return client.post("/rest/admin/graph", params);
}

/*
 * Budget preview
 */

export function postBudgetPreview(params) {
  return client.post("/rest/budget/1", params);
  /* return client.post("/rest/admin/budget", params); */
}

export function getExcel(params) {
  return excelClient.post("/rest/admin/report/xlsx", params);
}

/*
 * Change password
 */

export function postChangePassword(params) {
  return client.post("/rest/password", params);
}

/*
 *
 */

export function getWhoAmI() {
  return client.get("/rest/whoami");
}

export function postPreferences(params) {
  return client.post("/rest/pref", params);
}
