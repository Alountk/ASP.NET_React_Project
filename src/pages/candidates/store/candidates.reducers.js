import * as C from "./candidates.constants";
import { initialState } from "./candidates.state";

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case C.DELETE_CANDIDATE_SUCCESS:
      return {
        ...state,
        candidatesList: state.candidatesList.filter((x) => x.id !== payload.id),
        loading: false,
      };
    case C.UPDATE_CANDIDATE_SUCCESS:
      console.log(1,payload);
      return {
        ...state,
        candidatesList: state.candidatesList.map( (x) =>
        x.id === payload.id ? payload : x ),
        loading: false,
      };
    case C.CREATE_CANDIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        candidatesList: [...state.candidatesList, payload],
      };
    case C.GET_LIST_CANDIDATES_SUCCESS:
      return {
        ...state,
        loading: false,
        candidatesList: payload,
      };
    case C.DELETE_CANDIDATE_REQUEST:
    case C.UPDATE_CANDIDATE_REQUEST:
    case C.CREATE_CANDIDATE_REQUEST:
    case C.GET_LIST_CANDIDATES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case C.DELETE_CANDIDATE_FAILURE:
    case C.UPDATE_CANDIDATE_FAILURE:
    case C.CREATE_CANDIDATE_FAILURE:
    case C.GET_LIST_CANDIDATES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
