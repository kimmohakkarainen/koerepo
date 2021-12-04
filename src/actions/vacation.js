import * as api from "../api";
import { fetchError } from "./common";

/*
 * Flex hour calculation calls
 */

export function fetchVacations() {
  return dispatch => {
    api
      .fetchVacations()
      .then(resp => {
        dispatch(fetchVacationsSucceeded(resp.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  };
}

export function modifyVacation(project) {
  return dispatch => {
    api
      .modifyVacation(project)
      .then(resp => {
        dispatch(fetchVacationsSucceeded(resp.data));
      })
      .catch(error => {
    	  console.log(error.response);
    	  if(error.response.status == 304) {
    		  dispatch(modifyVacationError(error.response));
    	  } else {
    		  dispatch(fetchError(error.response));
    	  }
      });
  };
}

export function deleteVacation(project) {
	  return dispatch => {
	    api
	      .deleteVacation(project)
	      .then(resp => {
	        dispatch(fetchVacationsSucceeded(resp.data));
	      })
	      .catch(error => {
	        dispatch(fetchError(error));
	      });
	  };
	}


export function modifyVacationError(data) {
  return {
    type: "MODIFY_VACATION_ERROR",
    payload: {
      modifyerror: data
    }
  };
}

export function fetchVacationsSucceeded(data) {
	  return {
	    type: "FETCH_VACATIONS_SUCCEEDED",
	    payload: {
	      vacationview: data,
	      modifyerror: null,
	      error: null
	    }
	  };
	}



/* Vacation Admin API */

export function fetchAdminVacations() {
	  return dispatch => {
	    api
	      .fetchAdminVacations()
	      .then(resp => {
	        dispatch(fetchAdminVacationsSucceeded(resp.data));
	      })
	      .catch(error => {
	        dispatch(fetchError(error));
	      });
	  };
	}


export function fetchAdminVacationsSucceeded(data) {
	  return {
	    type: "FETCH_ADMIN_VACATIONS_SUCCEEDED",
	    payload: {
	    	vacationadminview: data,
	    	error: null
	    }
	  };
	}

