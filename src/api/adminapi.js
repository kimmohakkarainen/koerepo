import { client } from "./client.js";

/*
 * Person management
 */

export function getPersons() {
  return client.get("/rest/admin/persons");
}

export function postAddPerson(params) {
  return client.post("/rest/admin/person", params);
}

export function postPerson(params) {
  return client.post("/rest/admin/person/NEW", params);
}

export function postPersonDetails(params) {
  return client.post("/rest/admin/person/BASIC", params);
}

export function postPersonPassword(params) {
  return client.post("/rest/admin/person/PASSWORD", params);
}

export function postPersonRights(params) {
  return client.post("/rest/admin/person/RIGHTS", params);
}

export function postPersonFlex(params) {
  return client.post("/rest/admin/person/FLEX", params);
}

/*
 * Project Preferences
 */

export function postProjectPreferences(params) {
  return client.post("/rest/pref/projects", params);
}
