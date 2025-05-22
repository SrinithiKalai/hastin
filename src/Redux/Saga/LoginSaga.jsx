import { activeFailure, activeSuccess, cityFailure, citySuccess, countryFailure, countrySuccess, createFailure, createSuccess, currencyFailure, currencySuccess, loginFailure, loginSuccess, validFailure, validSuccess } from "../Action/LoginAction";
import { activeService, cityService, countryService, createService, currencyService, loginService, validService } from "../Service/LoginService";
import * as Type from "../Types";
import { call, put, takeLatest } from 'redux-saga/effects';

function* loginSaga({payload}){
try{
     const loginResponse = yield call(loginService, payload);
     yield put (loginSuccess(loginResponse.data))
}
catch(err){
     yield put(loginFailure(err))
}
}

function* validSaga({payload}){
     try{
          const validResponse = yield call(validService, payload);
          yield put (validSuccess(validResponse.data))
     }
     catch(err){
          yield put(validFailure(err))
     }
}

function* activeSaga({payload}){
     try{
          const activeResponse = yield call(activeService, payload);
          yield put(activeSuccess(activeResponse.data))
     }
     catch(err){
          yield put(activeFailure(err))
     }
}

function* countrySaga({payload}){
     try{
          const countryResponse = yield call(countryService, payload);
          yield put(countrySuccess(countryResponse.data))
     }
     catch(err){
          yield put(countryFailure(err))
     }
}

function* currencySaga({payload}){
     try{
          const currencyResponse = yield call(currencyService, payload);
          yield put(currencySuccess(currencyResponse.data))
     }
     catch(err){
          yield put(currencyFailure(err))
     }
}

function* citySaga({payload}){
     try{
          const cityResponse = yield call(cityService, payload);
          yield put(citySuccess(cityResponse.data))
     }
     catch(err){
          yield put(cityFailure(err))
     }
}

function* createSaga({payload}){
  try{
    const createResponse = yield call(createService, payload);
    yield put(createSuccess(createResponse.data));
  }
  catch(err){
    yield put(createFailure(err));
  }
}


export default function* SagaLogin(){
    yield takeLatest(Type.LOGIN_REQUEST,loginSaga);
    yield takeLatest(Type.VALIDATE_REQUEST,validSaga );
    yield takeLatest(Type.ACTIVE_REQUEST,activeSaga);
    yield takeLatest(Type.COUNTRY_REQUEST,countrySaga);
    yield takeLatest(Type.CURRENCY_REQUEST,currencySaga);
    yield takeLatest(Type.CITY_REQUEST, citySaga);
    yield takeLatest(Type.CREATE_REQUEST, createSaga);
}