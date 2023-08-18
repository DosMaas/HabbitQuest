

const dailyHabitsList = (state = [], action) => {
  switch (action.type) {
    case 'SET_DAILY_HABITS':
      return action.payload;
    default:
      return state;
  }
};


export default dailyHabitsList;