import { combineReducers } from "redux";

// displays the destinations from the db on the dom
const destinationList = (state = [], action) => {
  switch (action.type) {
    case 'SET_DESTINATION':
      return action.payload;
    case 'UNSET_DESTINATION':
      return [];
    default:
      return state;
  }
};

// adds the chosen destination to the users profile
const useDestination = (state = [], action) => {
  switch (action.type) {
    case 'USE_DESTINATION':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  destinationList,
  useDestination,
});
 