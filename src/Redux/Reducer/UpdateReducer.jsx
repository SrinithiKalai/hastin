import { HASTINUPDATE_FAILURE, HASTINUPDATE_REQUEST, HASTINUPDATE_SUCCESS } from "../Types";

const initialState = {
    loading: false,
    error: null,
    updateData: null,
};
export const updateReducer = (state = initialState, action) => {

    switch (action.type) {
        case HASTINUPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case HASTINUPDATE_SUCCESS:

            return {
                ...state,
                loading: false,
                createData: action.payload
            };
        case HASTINUPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }

}
