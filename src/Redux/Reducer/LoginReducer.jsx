import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, API_REQUEST, API_SUCCESS, API_FAILURE, TABLE_REQUEST, TABLE_FAILURE, TABLE_SUCCESS, COUNTRY_REQUEST, COUNTRY_SUCCESS, COUNTRY_FAILURE, CURRENCIE_REQUEST, CURRENCIE_FAILURE, INACTIVE_REQUEST, INACTIVE_SUCCESS, INACTIVE_FAILURE, TABLE_ID_REQUEST, INACTIVE_ID_REQUEST } from "../Types";

const initialState = {
    loading: false,
    data: null,
    error: null,
    editObj: null
};
export const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case API_REQUEST:
        case TABLE_REQUEST:
        case INACTIVE_REQUEST:
            case TABLE_ID_REQUEST:
        case INACTIVE_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case API_SUCCESS:
        case TABLE_SUCCESS:
        case INACTIVE_SUCCESS:
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case API_FAILURE:
        case TABLE_FAILURE:
        case INACTIVE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}
