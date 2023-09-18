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
    } catch (error) {
        console.log('Error with sending for titling:', error);
    }
}

// function* sendDreamForTitle(action) {
//     try {

//         const dreamDesc = action.payload;
//         const response = yield axios.post('/api/title', dreamDesc);
//         console.log('chatGPT response', response);
//         const firstTitleGenOBJECT = yield JSON.parse(response.data.choices[0].message.content);
//         const cleanedFirstTitleGenOBJECT = yield firstTitleGenOBJECT.replace(/\\"/g, '"');
//         const firstTitleGen = yield Object.keys(cleanedFirstTitleGenOBJECT[0]);
//         yield axios.put('/api/title', firstTitleGen);
//     } catch (error) {
//         console.log('Error with sending for titling:', error);
//     }
// }

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


}

export default interpretationSaga;