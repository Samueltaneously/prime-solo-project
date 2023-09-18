import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendDreamForInterpretation(action) {
    console.log('payload to interpretation router', action.payload);
    const dreamID = action.payload;
    try {

        const dreamData = yield axios.get(`api/interpretation/${dreamID}`);
        const dreamDesc = yield dreamData.data[0].dream_description;
        const response = yield axios.post('/api/interpretation', dreamDesc,);
        console.log('chatGPT response', response);
        const responseToClean = yield response.data.choices[0].message.content;
        const dreamInterpretation = yield { dreamInterpretation: responseToClean };
        yield axios.put(`/api/interpretation/${dreamID}`, dreamInterpretation);
        yield put({ type: 'GET_ALL_DREAMS' });
    } catch (error) {
        console.log('Error with sending for interpretation:', error);
    }
}

function* sendDreamForTitle(action) {
    try {

        const dreamDesc = action.payload;
        const response = yield axios.post('/api/title', dreamDesc);
        console.log('chatGPT response', response);
        const firstTitleGenToClean = yield response.data.choices[0].message.content;
        const firstTitleGen = yield { firstTitleGen: firstTitleGenToClean };
        yield axios.put('/api/title', firstTitleGen);
        yield put({ type: 'GET_ALL_DREAMS' });
    } catch (error) {
        console.log('Error with sending for titling:', error);
    }
}

function* sendDreamForImage(action) {
    const dreamID = action.payload;
    try {
        const dreamData = yield axios.get(`api/interpretation/${dreamID}`);
        const dreamDescToPackage = yield dreamData.data[0].dream_description;
        const dreamDesc = yield { dreamDesc: dreamDescToPackage };
        console.log('payload to image api', dreamDesc);
        const response = yield axios.post('/api/image', dreamDesc);
        console.log('chatGPT response', response);
        const imageUrlToClean = yield response.data.data[0].url;
        const imageUrl = yield { imageUrl: imageUrlToClean };
        yield axios.put(`/api/image/${dreamID}`, imageUrl);
        yield put({ type: 'GET_ALL_DREAMS' });
    } catch (error) {
        console.log('Error with sending for titling:', error);
    }
}

// function* sendDreamForTitle() {
//     try {

//         const dreamData = yield axios.get(`api/title`);
//         const dreamDesc = yield dreamData.data[0].dream_description;
//         const response = yield axios.post('/api/title', dreamDesc,);
//         console.log('chatGPT response', response);
//     } catch (error) {
//         console.log('Error with sending for titling:', error);
//     }
// }

function* interpretationSaga() {
    yield takeLatest('SEND_FOR_INTERPRETATION', sendDreamForInterpretation);
    yield takeLatest('SEND_FOR_TITLE', sendDreamForTitle);
    yield takeLatest('SEND_FOR_IMAGE', sendDreamForImage)

}

export default interpretationSaga;