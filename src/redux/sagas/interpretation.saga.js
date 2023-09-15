import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendDreamForInterpretation(action) {
    console.log('payload to interpretation router', action.payload);
    const dream_description = action.payload;
    try {

        // const config = {
        //     headers: { 'Content-Type': 'application/json' },
        //     withCredentials: true,
        // };

        // send the action.payload as the body
        // the config includes credentials which
        // allow the server session to recognize the user
        const response = yield axios.post('/api/interpretation', dream_description,);
        console.log('chatGPT response', response);
    } catch (error) {
        console.log('Error with sending for interpretation:', error);
    }
}

function* interpretationSaga() {
    yield takeLatest('SEND_FOR_INTERPRETATION', sendDreamForInterpretation);

}

export default interpretationSaga;