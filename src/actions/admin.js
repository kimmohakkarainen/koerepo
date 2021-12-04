import * as api from "../api";
import { fetchError } from "./common";

/*
 * Change Password
 */

export function postChangePassword(params) {
  return dispatch => {
    api
      .postChangePassword(params)
      .then(resp => {
        dispatch(changePasswordSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function changePasswordSucceeded(data) {
  return {
    type: "CHANGE_PASSWORD_SUCCEEDED",
    payload: { passwordview: data, error: null }
  };
}

export function dismissPasswordDialog() {
  return {
    type: "DISMISS_PASSWORD_DIALOG",
    payload: { passwordview: {}, error: null }
  };
}

/*
 * Person Management
 */

export function fetchPersons() {
  return dispatch => {
    api
      .getPersons()
      .then(resp => {
        dispatch(fetchPersonsSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function postAddPerson(data) {
  return dispatch => {
    api
      .postAddPerson(data)
      .then(resp => {
        dispatch(fetchPersonsSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function postPerson(data) {
  return dispatch => {
    api
      .postPerson(data)
      .then(resp => {
        dispatch(fetchPersonsSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function postPersonDetail(data) {
  return dispatch => {
    api
      .postPersonDetails(data)
      .then(resp => {
        dispatch(fetchPersonsSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function postPersonRights(data) {
  return dispatch => {
    api
      .postPersonRights(data)
      .then(resp => {
        dispatch(fetchPersonsSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function postPersonFlex(data) {
  return dispatch => {
    api
      .postPersonFlex(data)
      .then(resp => {
        dispatch(fetchPersonsSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function postPersonPassword(data) {
  return dispatch => {
    api
      .postPersonPassword(data)
      .then(resp => {
        dispatch(fetchPersonsSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function fetchPersonsSucceeded(data) {
  return {
    type: "FETCH_PERSONS_SUCCEEDED",
    payload: { personadmin: data, error: null }
  };
}
