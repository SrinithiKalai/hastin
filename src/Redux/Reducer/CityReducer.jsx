import { CITY_FAILURE, CITY_REQUEST, CITY_SUCCESS } from "../Types";

const initialState = {
  loading: false,
  error: null,
  cityData: [],
};

export const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case CITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CITY_SUCCESS:
      return {
        ...state,
        loading: false,
        cityData: action.payload
      };
    case CITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
