import * as Type from "../Types";

export const loginRequest = (data) => {
    return {
        type: Type.LOGIN_REQUEST,
        payload: data
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

export const apiRequest = (data) => {
    return {
        type: Type.API_REQUEST,
        payload: data
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

export const tableRequest = (data) => {
    return {
        type: Type.TABLE_REQUEST,
        payload: data
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

export const countryRequest = (data) => {
    return {
        type: Type.COUNTRY_REQUEST,
        payload: data
    }
}
export const countrySuccess = (data) => {
    return {
        type: Type.COUNTRY_SUCCESS,
        payload: data
    }
}
export const countryFailure = (error) => {
    return {
        type: Type.COUNTRY_FAILURE,
        payload: error
    }
}

export const currencyRequest = (data) => {
    return {
        type: Type.CURRENCY_REQUEST,
        payload: data
    }
}
export const currencySuccess = (data) => {
    return {
        type: Type.CURRENCY_SUCCESS,
        payload: data
    }
}
export const currencyFailure = (error) => {
    return {
        type: Type.CURRENCY_FAILURE,
        payload: error
    }
}

export const cityRequest = (payload) => {
    return {
        type: Type.CITY_REQUEST,
        payload,
    }
}
export const citySuccess = (data) => {
    return {
        type: Type.CITY_SUCCESS,
        payload: data
    }
}
export const cityFailure = (error) => {
    return {
        type: Type.CITY_FAILURE,
        payload: error
    }
}

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
