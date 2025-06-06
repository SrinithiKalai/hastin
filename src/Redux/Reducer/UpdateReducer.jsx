import { UPDATE_FAILURE, UPDATE_REQUEST, UPDATE_SUCCESS } from "../Types";

const initialState = {
    loading: false,
    error: null,
    data: [],           // Is this list populated somewhere else?
    editObj: null,
};

export const updateReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                // Update the item in data array by matching id
                data: state.data.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
                editObj: null,
            };
        case UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
