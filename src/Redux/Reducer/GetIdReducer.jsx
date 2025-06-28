import { GET_ID_FAILURE, GET_ID_REQUEST, GET_ID_SUCCESS, TICK_FAILURE, TICK_REQUEST, TICK_SUCCESS, UPDATE_FAILURE, UPDATE_REQUEST, UPDATE_SUCCESS } from "../Types";

const initialState = {
  loading: false,
  error: null,
  editObj: null,
  data: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ID_REQUEST:
    case UPDATE_REQUEST:
    case TICK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        editObj: action.payload
      };

    case UPDATE_SUCCESS:
    case TICK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        editObj: null
      };

    case GET_ID_FAILURE:
    case UPDATE_FAILURE:
    case TICK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
