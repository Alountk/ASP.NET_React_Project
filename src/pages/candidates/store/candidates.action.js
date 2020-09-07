import * as C from './candidates.constants';
// LIST ARTICLES
export const getListCandidatesRequest = payload => ({
  type: C.GET_LIST_CANDIDATES_REQUEST,
  payload,
});
export const getListCandidatesSuccess = payload => ({
  type: C.GET_LIST_CANDIDATES_SUCCESS,
  payload,
});
export const getListCandidatesFailure = payload => ({
  type: C.GET_LIST_CANDIDATES_FAILURE,
  payload,
});
export const createCandidateRequest = payload => ({
  type: C.CREATE_CANDIDATE_REQUEST,
  payload,
});
export const createCandidateSuccess = payload => ({
  type: C.CREATE_CANDIDATE_SUCCESS,
  payload,
});
export const createCandidateFailure = payload => ({
  type: C.CREATE_CANDIDATE_FAILURE,
  payload,
});
export const updateCandidateRequest = payload => ({
  type: C.UPDATE_CANDIDATE_REQUEST,
  payload,
});
export const updateCandidateSuccess = payload => ({
  type: C.UPDATE_CANDIDATE_SUCCESS,
  payload,
});
export const updateCandidateFailure = payload => ({
  type: C.UPDATE_CANDIDATE_FAILURE,
  payload,
});
export const deleteCandidateRequest = payload => ({
  type: C.DELETE_CANDIDATE_REQUEST,
  payload,
});
export const deleteCandidateSuccess = payload => ({
  type: C.DELETE_CANDIDATE_SUCCESS,
  payload,
});
export const deleteCandidateFailure = payload => ({
  type: C.DELETE_CANDIDATE_FAILURE,
  payload,
});