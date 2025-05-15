import { CREATE_FAILURE, CREATE_REQUEST, CREATE_SUCCESS } from "../Types";

const initialState = {
    loading: false,
    data: [],
    error: null
};

export const createReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload]
            };
        case CREATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};