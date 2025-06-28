import { CONTACT_FAILURE, CONTACT_REQUEST, CONTACT_SUCCESS } from "../Types";

const initialState = {
  loading: false,
  error: null,
  contactData: null,
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_REQUEST:
      return { 
        ...state, 
        loading: true, 
        error: null 
      };
    case CONTACT_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        contactData: action.payload 
      };
    case CONTACT_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    default:
      return state;
  }
};
