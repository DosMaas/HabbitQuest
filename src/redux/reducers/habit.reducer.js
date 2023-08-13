import { combineReducers } from "redux";

// adds the new habit to the database
const habitList = (state = [], action) => {
  switch (action.type) {
    case 'SET_HABIT':
      return action.payload;
    default:
      return state;
  }
};

// displays the added habit on the habits page
// const displayHabit = (state =[], action) => {
//   switch (action.type) {
//     case 'SET_HABIT':
//       return action.payload;
//     default:
//       return state;
//   }
// }

export default combineReducers({
  habitList,
  // displayHabit,
});