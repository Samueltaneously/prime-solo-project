import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addDreamSaga(action) {
    try {

        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // send the action.payload as the body
        // the config includes credentials which
        // allow the server session to recognize the user
        yield axios.post('/api/dream', action.payload, config);

    } catch (error) {
        console.log('Error with dream adding:', error);
    }
}

function* fetchDreams() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        const response = yield axios.get('/api/dream', config);

        yield put({ type: 'SET_ALL_DREAMS', payload: response.data });
    } catch (error) {
        console.log('All dreams get request failed', error);
    }
}


function* dreamSaga() {
    yield takeLatest('ADD_DREAM', addDreamSaga);
    yield takeLatest('GET_ALL_DREAMS', fetchDreams);
}

export default dreamSaga;
