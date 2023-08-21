import { combineReducers } from "redux";


const habitProgress = (state = [], action) => {
  switch (action.type) {
    case 'SET_HABIT_PROGRESS':
      return action.payload;
    default:
      return state;
  }
};

const destinationProgress = (state = [], action) => {
  switch (action.type) {
    case 'SET_DESTINATION_PROGRESS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  habitProgress,
	destinationProgress
});