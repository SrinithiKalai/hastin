import { ACTIVE_FAILURE, ACTIVE_REQUEST, ACTIVE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, VALIDATE_FAILURE, VALIDATE_REQUEST, VALIDATE_SUCCESS } from "../Types";

const initialState = {
    loading: false,
    data: [],
    error: null
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case VALIDATE_REQUEST:
        case ACTIVE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case LOGIN_SUCCESS:
        case VALIDATE_SUCCESS:
        case ACTIVE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload]
            };
        case LOGIN_FAILURE:
        case VALIDATE_FAILURE:
        case ACTIVE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};