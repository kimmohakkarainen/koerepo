import * as api from "../api";
import { fetchError } from "./common";

/*
 * Flex hour calculation calls
 */

export function fetchFlexProjects() {
  return dispatch => {
    api
      .fetchFlexProjects()
      .then(resp => {
        dispatch(fetchFlexProjectsSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function saveFlexProject(project) {
  return dispatch => {
    api
      .postFlexProject(project)
      .then(resp => {
        dispatch(fetchFlexProjectsSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchFlexProjectsSucceeded(data) {
  return {
    type: "FETCH_FLEX_PROJECTS_SUCCEEDED",
    payload: {
      flexprojects: data
    }
  };
}

export function fetchFlexPersons() {
  return dispatch => {
    api
      .fetchFlexPersons()
      .then(resp => {
        dispatch(fetchFlexPersonsSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function saveFlexPerson(person) {
  return dispatch => {
    api
      .postFlexPerson(person)
      .then(resp => {
        dispatch(fetchFlexPersonsSucceeded(resp.data.persons));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchFlexPersonsSucceeded(data) {
  return {
    type: "FETCH_FLEX_PERSONS_SUCCEEDED",
    payload: {
      flexpersons: data
    }
  };
}

export function fetchPersonFlexSummary(personId) {
  return dispatch => {
    api
      .fetchPersonFlexSummary(personId)
      .then(resp => {
        dispatch(fetchPersonFlexSummarySucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchPersonFlexSummarySucceeded(data) {
  return {
    type: "FETCH_PERSON_FLEX_SUMMARY_SUCCEEDED",
    payload: {
      flexView: data
    }
  };
}
