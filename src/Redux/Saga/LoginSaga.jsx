import { apiFailure, apiSuccess, cityFailure, citySuccess, countryFailure, countrySuccess, createFailure, createSuccess, currencyFailure, currencySuccess, getIdFailure, getIdSuccess, loginFailure, loginSuccess, resendFailure, resendSuccess, tableFailure, tableSuccess, updateFailure, updateSuccess } from '../Action/LoginAction'
import { apiService, cityService, countryService, createService, currencyService, getIdService, loginService, resendService, tableService, updateService } from '../Service/LoginService'
import * as TYPE from '../Types'
import { call, put, takeLatest } from 'redux-saga/effects'

function* loginSaga({ payload }) {
  try {
    const response = yield call(loginService, payload);
    yield put(loginSuccess(response.data));
  }
  catch (err) {
    yield put(loginFailure(err))
  }
}

function* apiSaga({ payload }) {
  try {
    const response = yield call(apiService, payload);
    yield put(apiSuccess(response.data));
  }
  catch (err) {
    yield put(apiFailure(err))
  }
}

function* resendSaga({ payload }) {
  try {
    const response = yield call(resendService, payload);
    yield put(resendSuccess(response.data));
  }
  catch (err) {
    yield put(resendFailure(err))
  }
}

function* tableSaga({ payload }) {
  try {
    const response = yield call(tableService, payload);
    yield put(tableSuccess(response.data));
  }
  catch (err) {
    yield put(tableFailure(err))
  }
}

function* currencySaga() {
    try {
        const response = yield call(currencyService);
        yield put(currencySuccess(response.data));
    } catch (error) {
        yield put(currencyFailure(error));
    }
}

function* countrySaga() {
  try {
    const response = yield call(countryService);
    yield put(countrySuccess(response.data));
  } catch (error) {
    yield put(countryFailure(error));
  }
}

function* citySaga() {
  try {
    const response = yield call(cityService);
    yield put(citySuccess(response.data));
  } catch (error) {
    console.error("City Fetch Error:", error);
    yield put(cityFailure(error));
  }
}

function* createSaga({ payload }) {
  try {
    const response = yield call(createService, payload);
    yield put(createSuccess(response.data));
  }
  catch (err) {
    yield put(createFailure(err))
  }
}

function* getIdSaga({payload}) {
  try{
    const response = yield call(getIdService, payload);
    yield put(getIdSuccess(response.data.data));
  }
  catch(err) {
    yield put(getIdFailure(err))
  }
}

function* updateSaga({ payload }) {
  try {
    const { id, data } = payload;
    const response = yield call(updateService, id, data);
    yield put(updateSuccess(response.data));
  }
  catch (err) {
    yield put(updateFailure(err))
  }
}

export default function* login() {
  yield takeLatest(TYPE.LOGIN_REQUEST, loginSaga);
  yield takeLatest(TYPE.API_REQUEST, apiSaga);
  yield takeLatest(TYPE.RESEND_REQUEST, resendSaga);
  yield takeLatest(TYPE.TABLE_REQUEST, tableSaga);
  yield takeLatest(TYPE.COUNTRY_REQUEST, countrySaga);
  yield takeLatest(TYPE.CURRENCY_REQUEST, currencySaga);
  yield takeLatest(TYPE.CITY_REQUEST, citySaga);
  yield takeLatest(TYPE.CREATE_REQUEST, createSaga);
  yield takeLatest(TYPE.GET_ID_REQUEST, getIdSaga);
  yield takeLatest(TYPE.UPDATE_REQUEST, updateSaga);
}