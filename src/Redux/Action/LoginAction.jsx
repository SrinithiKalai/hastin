import * as Type from "../Types";

export const loginRequest = (data) => {
    return{
        type : Type.LOGIN_REQUEST,
        payload : data
    }
}
export const loginSuccess = (data) => {
    return{
        type : Type.LOGIN_SUCCESS,
        payload : data
    }
}
export const loginFailure = (error) => {
    return{
        type : Type.LOGIN_FAILURE,
        payload : error
    }
}

export const validRequest = (data) => {
    return{
        type : Type.VALIDATE_REQUEST,
        payload : data
    }
}
export const validSuccess = (data) => {
    return{
        type : Type.VALIDATE_SUCCESS,
        payload : data
    }
}
export const validFailure = (error) => {
    return{
        type : Type.VALIDATE_FAILURE,
        payload : error
    }
}

export const activeRequest = (data) => {
    return{
        type : Type.ACTIVE_REQUEST,
        payload : data
    }
}
export const activeSuccess = (data) => {
    return{
        type : Type.ACTIVE_SUCCESS, 
        payload : data
    }
}
export const activeFailure = (error) => {
    return{
        type : Type.ACTIVE_FAILURE,
        payload : error
    }
}

export const countryRequest = (data) => {
    return{
        type : Type.COUNTRY_REQUEST,
        payload : data
    }
}
export const countrySuccess = (data) => {
    return{
        type : Type.COUNTRY_SUCCESS,
        payload : data
    }
}
export const countryFailure = (error) => {
    return{
        type : Type.COUNTRY_FAILURE,
        payload : error
    }
}

export const currencyRequest = (data) => {
    return{
        type : Type.CURRENCY_REQUEST,
        payload : data
    }
}
export const currencySuccess = (data) => {
    return{
        type : Type.CURRENCY_SUCCESS,
        payload : data
    }
}
export const currencyFailure = (error) => {
    return{
        type : Type.CURRENCY_FAILURE,
        payload : error
    }
}

export const cityRequest = (payload) => {
    return{
        type : Type.CITY_REQUEST,
        payload,
    }
}
export const citySuccess = (data) => {
    return{
        type : Type.CITY_SUCCESS,
        payload : data
    }
}

export const cityFailure = (error) => {
    return{
        type : Type.CITY_FAILURE,
        payload : error
    }
}


export const createRequest = (payload) => {
    return{
        type : Type.CREATE_REQUEST,
        payload,
    }
}


export const createSuccess = (data) => {
    return{
        type : Type.CREATE_SUCCESS,
        payload : data
    }
}
export const createFailure = (error) => {
    return{
        type : Type.CREATE_FAILURE,
        payload : error
    }
}