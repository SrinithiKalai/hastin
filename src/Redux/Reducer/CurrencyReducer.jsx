import { CURRENCY_REQUEST, CURRENCY_FAILURE, CURRENCY_SUCCESS } from "../Types";

const initialState = {
    loading: false,
    error: null,
    currencyData: null,
};
export const currencyReducer = (state = initialState, action) => {

    switch (action.type) {
        case CURRENCY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CURRENCY_SUCCESS:
            return {
                ...state,
                loading: false,
                currencyData: action.payload
            };
        case CURRENCY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
