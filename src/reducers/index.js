export default function rapsaState(
  state = {
    error: null,
    whoami: {},
    dayview: {
      today: null,
      projects: []
    },
    weekview: {},
    monthview: {},
    customerview: [],
    projectview: {},
    reportview: {},
    graphview: {},
    budgetview: {},
    pricingview: {},
    passwordview: {},
    projectprefview: [],
    flexprojects: {
      unclassified: [],
      all: [],
      classificationOptions: []
    },
    personadmin: [],
    flexpersons: { header: [], persons: [] },
    flexView: {},
    vacationview: { types: [], periods: [] },
    vacationadminview: []
  },
  action
) {
  console.log(action);
  const newstate = Object.assign({}, state, action.payload);
  return newstate;
}
