import { CURRENCIE_REQUEST, CURRENCIE_FAILURE, CURRENCIE_SUCCESS } from "../Types";

const initialState = {
    loading: false,
    error: null,
    currencyData: null,
};
export const currencyReducer = (state = initialState, action) => {

    switch (action.type) {
        case CURRENCIE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case CURRENCIE_SUCCESS:
            return {
                ...state,
                loading: false,
                currencyData: action.payload
            };
        case CURRENCIE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
