import { GET_ID_FAILURE, GET_ID_REQUEST, GET_ID_SUCCESS } from "../Types";

const initialState = {
    loading: false,
    error: null,
    editData: null,
};
export const getIdReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                editData: action.payload
            };
        case GET_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }

}
