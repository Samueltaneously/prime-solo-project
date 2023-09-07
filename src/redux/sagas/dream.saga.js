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


function* dreamSaga() {
    yield takeLatest('ADD_DREAM', addDreamSaga);
}

export default dreamSaga;
