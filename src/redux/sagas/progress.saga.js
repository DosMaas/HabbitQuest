const { takeLatest, put } = require("redux-saga/effects");



function* fetchHabitsProgress() {
  try {
    const response = yield fetch('/api/progress/habits');
    if (!response.ok) {
      throw new Error('Network response was not ok in fetch habits progress');
    }
    const habitProgress = yield response.json();
    yield put({type: 'SET_HABIT_PROGRESS', payload: habitProgress});
  } catch(error) {
    console.error('Habit progress get request failed', error)
  }
};

function* fetchDestinationProgress() {
  try {
    const response = yield fetch('/api/progress/destinations');
    if (!response.ok) {
      throw new Error('Network response was not ok in fetch destination progress');
    }
    const destinationProgress = yield response.json();
    console.log({destinationProgress})
    yield put({ type: 'SET_DESTINATION_PROGRESS', payload: destinationProgress});
  } catch(error) {
    console.error('Destination progress get request failed', error)
  }
};

function* progressSaga() {
  yield takeLatest('FETCH_HABITS_PROGRESS', fetchHabitsProgress);
  yield takeLatest('FETCH_DESTINATION_PROGRESS', fetchDestinationProgress);
}

export default progressSaga;
