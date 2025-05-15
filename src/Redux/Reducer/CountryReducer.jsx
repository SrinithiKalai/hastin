import { COUNTRY_FAILURE, COUNTRY_REQUEST, COUNTRY_SUCCESS } from "../Types";

const initialState = {
    loading: false,
    data: [],
    error: null
};

export const countryReducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNTRY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case COUNTRY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data
            };
        case COUNTRY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};