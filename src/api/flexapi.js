import { client } from "./client.js";

/*
 * Flex hour calls
 */

export function fetchFlexProjects() {
  return client.get("/rest/admin/flex/projects");
}

export function postFlexProject(params) {
  return client.post("/rest/admin/flex/project", params);
}

export function fetchFlexPersons() {
  return client.get("/rest/admin/flex/persons");
}

export function postFlexPerson(params) {
  return client.post("/rest/admin/flex/person", params);
}

export function fetchPersonFlexSummary(personId) {
  if (personId > 0) {
    return client.get("/rest/admin/flex/person/" + personId);
  } else {
    return client.get("/rest/admin/flex/person");
  }
}
