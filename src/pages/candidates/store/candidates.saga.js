import {call, put, takeLatest} from 'redux-saga/effects';
import * as C from './candidates.constants';
import * as A from './candidates.action';
import CandidatesRepository from '../api/candidate.api';

function* getCandidatesListEffect({payload}){
    try {
        const response = yield call(CandidatesRepository.getListCandidates, payload);
        yield put(A.getListCandidatesSuccess(response));        
    } catch (error) {
        yield put(A.getListCandidatesFailure(error));
    }
}
function* createCandidateEffect({payload}){
    try {
        payload.age=parseInt(payload.age);
        const response = yield call(CandidatesRepository.createCandidate, payload);
        yield put(A.createCandidateSuccess(response));
    } catch (error) {
        yield put(A.createCandidateFailure(error));
        // yield put(GlobalAction.createError(e.message));
    }
}
function* updateCandidateEffect({payload}){
    try {
        payload.age=parseInt(payload.age);
        const response = yield call(CandidatesRepository.updateCandidate, payload);
        yield put(A.updateCandidateSuccess(response));
    } catch (error) {
        yield put(A.updateCandidateFailure(error));
        // yield put(GlobalAction.createError(e.message));
    }
}
function* deleteCandidateEffect(id){
    try {
        let {payload} = id;
        const response = yield call(CandidatesRepository.deleteCandidate, payload);
        yield put(A.deleteCandidateSuccess(response));
    } catch (error) {
        yield put(A.deleteCandidateFailure(error));
        // yield put(GlobalAction.createError(e.message));
    }
}

export default function* () {
    yield takeLatest(C.GET_LIST_CANDIDATES_REQUEST, getCandidatesListEffect);
    yield takeLatest(C.CREATE_CANDIDATE_REQUEST, createCandidateEffect);
    yield takeLatest(C.UPDATE_CANDIDATE_REQUEST, updateCandidateEffect);
    yield takeLatest(C.DELETE_CANDIDATE_REQUEST, deleteCandidateEffect);
}