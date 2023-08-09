import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_DESTINATION" actions
function* fetchDestination() {
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

function* addDestination() {
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
    yield put({ type: 'USE_DESTINATION'});
  } catch (error) {
    console.error(error);
  }
};

function* destinationSaga() {
  yield takeLatest('FETCH_DESTINATION', fetchDestination);
  yield takeLatest('ADD_DESTINATION', addDestination)
}

export default destinationSaga;