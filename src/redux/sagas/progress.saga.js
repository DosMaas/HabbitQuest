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
    console.log('Habit progress get request failed', error)
  }
};

function* progressSaga() {
  yield takeLatest('FETCH_HABITS_PROGRESS', fetchHabitsProgress)
}

export default progressSaga;
