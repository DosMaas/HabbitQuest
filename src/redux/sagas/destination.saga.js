import { put, takeLatest } from 'redux-saga/effects';

// retrieves list of destinations from database for user to choose from
function* fetchDestination(action) {
  try {
    const response = yield fetch('/api/destinations');
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const destination = yield response.json();
    yield put({ type: 'SET_DESTINATION', payload: destination });
  } catch (error) {
    console.log('Destination get request failed', error);
  }
}

function* addDestination(action) {
  try {
    const response = yield fetch('/api/destinations', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });
    if (!response.ok) {
      throw new Error('Error adding destination');
    }
    const results = yield response.json();
    console.log('response:', results);
    yield put({ type: 'USE_DESTINATION', payload: results});
  } catch (error) {
    console.error(error);
  }
};

function* destinationSaga() {
  yield takeLatest('FETCH_DESTINATION', fetchDestination);
  yield takeLatest('ADD_DESTINATION', addDestination)
}

export default destinationSaga;