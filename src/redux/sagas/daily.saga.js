const { put, takeLatest } = require("redux-saga/effects");


function* fetchDailyHabits() {
  try {
    const response = yield fetch('/api/daily/dailies');
    if (!response.ok) {
      throw new Error('Network response was not ok in fetch daily habits');
    }
    const habits = yield response.json();
    yield put({type: 'SET_DAILY_HABITS', payload: habits});
  } catch(error) {
    console.log('Daily habits get request failed', error)
  }
};

function* deleteHabit(action) {
  try {
    const response = yield fetch(`/api/daily/${action.payload}`, {method: 'DELETE', });
    if(!response.ok) {
      throw new Error('Error deleting habit');
    }
    yield put({type: 'FETCH_DAILY_HABITS'});
  } catch (error) {
    console.error('Error fetching habit', error)
  };
}

function* editHabit(action) {
  try {
    const response = yield fetch('/api/daily/edit', {
      method: 'PUT',
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error('Error editing habit');
    }
    yield put({ type: 'FETCH_DAILY_HABITS'});
  } catch (error) {
    console.error('Error fetching habits', error)
  };
}


function* completeHabit(action) {
  console.log('Action', action.payload)
  try {
    const response = yield fetch('/api/daily/complete', {
      method: 'PUT',
      body: JSON.stringify(action.payload),
      headers: { "Content-Type": "application/json" },
    });
    console.log('Completed habit!')
    if (!response.ok) {
      throw new Error('Error completing habit');
    }
    yield put({ type: 'FETCH_DAILY_HABITS'});
  } catch (error) {
    console.error('Error fetching habits', error)
  };
}



function* dailyHabitsSaga() {
  yield takeLatest('FETCH_DAILY_HABITS', fetchDailyHabits);
  yield takeLatest('DELETE_HABIT', deleteHabit);
  yield takeLatest('EDIT_HABIT', editHabit);
  yield takeLatest('COMPLETE_HABIT', completeHabit);
}

export default dailyHabitsSaga;