import { CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE } from "../Types";

const initialState = {
    loading: false,
    error: null,
    createData: null,
};
export const createReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                createData: action.payload
            };
        case CREATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }

}