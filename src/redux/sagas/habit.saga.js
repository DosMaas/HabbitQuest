import { put, take, takeLatest } from 'redux-saga/effects';

function* addHabit(action) {
  try {
    const response = yield fetch('/api/habits', {
      method: 'POST',
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error('Error adding habit');
    }
    // const results = yield response.json();
    yield put({ type: 'FETCH_HABIT' });
  } catch (error) {
    console.error('Error adding habit', error)
  };
}

function* fetchHabit() {
  try {
    const response = yield fetch('/api/habits');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const habit = yield response.json();
    yield put({ type: 'SET_HABIT', payload: habit});
  } catch(error) {
    console.log('Habit get request failed', error);
  }
}

function* habitSaga() {
  yield takeLatest('ADD_HABIT', addHabit);
  yield takeLatest('FETCH_HABIT', fetchHabit);
}

export default habitSaga;