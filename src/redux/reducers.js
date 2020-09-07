import {combineReducers} from 'redux';
import candidatesReducers from '../pages/candidates/store/candidates.reducers';

export default combineReducers({
    candidates: candidatesReducers,
});