import { client } from "./client.js";

/*
 * Vacation API calls
 */

export function fetchVacations() {
  return client.get("/rest/vacation");
}

export function modifyVacation(params) {
  return client.post("/rest/vacation", params);
}

export function deleteVacation(params) {
  return client.delete("/rest/vacation", {data : params } );
}

/* 
 * Vacation Admin API
 */

export function fetchAdminVacations() {
	  return client.get("/rest/admin/vacation");
	}

