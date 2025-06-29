import * as Type from "../Types";

export const loginRequest = (payload) => {
    return {
        type: Type.LOGIN_REQUEST,
        payload,
    }
}
export const loginSuccess = (data) => {
    return {
        type: Type.LOGIN_SUCCESS,
        payload: data
    }
}
export const loginFailure = (error) => {
    return {
        type: Type.LOGIN_FAILURE,
        payload: error
    }
}

export const apiRequest = (payload) => {
    return {
        type: Type.API_REQUEST,
        payload,
    }
}
export const apiSuccess = (data) => {
    return {
        type: Type.API_SUCCESS,
        payload: data
    }
}
export const apiFailure = (error) => {
    return {
        type: Type.API_FAILURE,
        payload: error
    }
}

export const resendRequest = (payload) => {
    return {
        type: Type.RESEND_REQUEST,
        payload,
    }
}
export const resendSuccess = (data) => {
    return {
        type: Type.RESEND_SUCCESS,
        payload: data
    }
}
export const resendFailure = (error) => {
    return {
        type: Type.RESEND_FAILURE,
        payload: error
    }
}

export const tableRequest = (payload) => {
    return {
        type: Type.TABLE_REQUEST,
        payload,
    }
}
export const tableSuccess = (data) => {
    return {
        type: Type.TABLE_SUCCESS,
        payload: data
    }
}
export const tableFailure = (error) => {
    return {
        type: Type.TABLE_FAILURE,
        payload: error
    }
}

export const inactiveRequest = (payload) => {
    return {
        type: Type.INACTIVE_REQUEST,
        payload,
    }
}
export const inactiveSuccess = (data) => {
    return {
        type: Type.INACTIVE_SUCCESS,
        payload: data
    }
}
export const inactiveFailure = (error) => {
    return {
        type: Type.INACTIVE_FAILURE,
        payload: error
    }
}

export const tableIdRequest = (id) => {
    return {
        type: Type.TABLE_ID_REQUEST,
        payload: id
    }
}
export const tableIdSuccess = (data) => {
    return {
        type: Type.TABLE_ID_SUCCESS,
        payload: data
    }
}
export const tableIdFailure = (error) => {
    return {
        type: Type.TABLE_ID_FAILURE,
        payload: error
    }
}

export const inactiveIdRequest = (id) => {
    return {
        type: Type.INACTIVE_ID_REQUEST,
        payload: id
    }
}
export const inactiveIdSuccess = (data) => {
    return {
        type: Type.INACTIVE_ID_SUCCESS,
        payload: data
    }
}
export const inactiveIdFailure = (error) => {
    return {
        type: Type.INACTIVE_ID_FAILURE,
        payload: error
    }
}

export const currencyRequest = () => {
    return {
        type: Type.CURRENCY_REQUEST,
    }
};

export const currencySuccess = (data) => {
    return {
        type: Type.CURRENCY_SUCCESS,
        payload: data,
    }
};

export const currencyFailure = (error) => {
    return {
        type: Type.CURRENCY_FAILURE,
        payload: error,
    }
};

export const countryRequest = () => {
    return {
        type: Type.COUNTRY_REQUEST,
    }
};
export const countrySuccess = (data) => {
    return {
        type: Type.COUNTRY_SUCCESS,
        payload: data
    }
};
export const countryFailure = (error) => {
    return {
        type: Type.COUNTRY_FAILURE,
        payload: error
    }
};

export const cityRequest = () => {
    return {
        type: Type.CITY_REQUEST,
    }
};
export const citySuccess = (data) => {
    return {
        type: Type.CITY_SUCCESS,
        payload: data
    }
};
export const cityFailure = (error) => {
    return {
        type: Type.CITY_FAILURE,
        payload: error
    }
};

export const createRequest = (payload) => {
    return {
        type: Type.CREATE_REQUEST,
        payload,
    }
}
export const createSuccess = (data) => {
    return {
        type: Type.CREATE_SUCCESS,
        payload: data
    }
}
export const createFailure = (error) => {
    return {
        type: Type.CREATE_FAILURE,
        payload: error
    }
}

export const getIdRequest = (id) => {
    return {
        type: Type.GET_ID_REQUEST,
        payload: id
    }
}
export const getIdSuccess = (data) => {
    return {
        type: Type.GET_ID_SUCCESS,
        payload: data
    }
}
export const getIdFailure = (error) => {
    return {
        type: Type.GET_ID_FAILURE,
        payload: error
    }
}

export const updateRequest = (payload) => {
    return {
        type: Type.UPDATE_REQUEST,
        payload,
    }
}
export const updateSuccess = (data) => {
    return {
        type: Type.UPDATE_SUCCESS,
        payload: data
    }
}
export const updateFailure = (error) => {
    return {
        type: Type.UPDATE_FAILURE,
        payload: error
    }
}

export const tickRequest = (payload) => {
    return {
        type: Type.TICK_REQUEST,
        payload,
    }
}
export const tickSuccess = (data) => {
    return {
        type: Type.TICK_SUCCESS,
        payload: data
    }
}
export const tickFailure = (error) => {
    return {
        type: Type.TICK_FAILURE,
        payload: error
    }
}

export const contactRequest = (payload) => {
    return {
        type: Type.CONTACT_REQUEST,
        payload,
    }
}
export const contactSuccess = (data) => {
    return {
        type: Type.CONTACT_SUCCESS,
        payload: data
    }
}
export const contactFailure = (error) => {
    return {
        type: Type.CONTACT_FAILURE,
        payload: error
    }
}

