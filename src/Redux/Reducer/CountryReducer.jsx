import { COUNTRY_REQUEST, COUNTRY_SUCCESS, COUNTRY_FAILURE } from "../Types";

const initialState = {
    loading: false,
    error: null,
    countryData: [],
};
export const countryReducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNTRY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case COUNTRY_SUCCESS:
            return {
                ...state,
                loading: false,
                countryData: action.payload
            };
        case COUNTRY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }

}
