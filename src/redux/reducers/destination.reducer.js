const destinationList = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DESTINATION':
      return action.payload;
    case 'UNSET_DESTINATION':
      return {};
    default:
      return state;
  }
};

export default destinationList;