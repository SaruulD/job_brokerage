import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../util";

const initialState = {
    job_id: 1,
};

const jobDetails = (state, action) => {
    return updateObject(state, {
        job_id: action.job_id,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.JOB_DETAILS:
            return jobDetails(state, action);
        default:
            return state;
    }
};

export default reducer;
