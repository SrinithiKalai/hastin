import { apiFailure, apiSuccess, cityFailure, citySuccess, countryFailure, countrySuccess, createFailure, createSuccess, currencyFailure, currencySuccess, getIdFailure, getIdSuccess, loginFailure, loginSuccess, tableFailure, tableSuccess, updateFailure, updateSuccess } from '../Action/LoginAction'
import { apiService, cityService, countryService, createService, currencyService, getIdService, loginService, tableService, updateService } from '../Service/LoginService'
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

function* tableSaga({ payload }) {
  try {
    const response = yield call(tableService, payload);
    yield put(tableSuccess(response.data));
  }
  catch (err) {
    yield put(tableFailure(err))
  }
}

function* countrySaga({ payload }) {
  try {
    const response = yield call(countryService, payload);
    yield put(countrySuccess(response.data));
  }
  catch (err) {
    yield put(countryFailure(err))
  }
}

function* currencySaga({ payload }) {
  try {
    const response = yield call(currencyService, payload);
    yield put(currencySuccess(response.data));
  }
  catch (err) {
    yield put(currencyFailure(err))
  }
}

function* citySaga({ payload }) {
  try {
    const response = yield call(cityService, payload);
    yield put(citySuccess(response.data));
  }
  catch (err) {
    yield put(cityFailure(err))
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

function* updateSaga({ payload }) {
  try {
    const response = yield call(updateService, payload);
    yield put(updateSuccess(response.data));
  }
  catch (err) {
    yield put(updateFailure(err))
  }
}

function* getIdSaga({payload}) {
  try{
    const response = yield call(getIdService, payload);
    yield put(getIdSuccess(response.data));
  }
  catch(err) {
    yield put(getIdFailure(err))
  }
}

export default function* login() {
  yield takeLatest(TYPE.LOGIN_REQUEST, loginSaga);
  yield takeLatest(TYPE.API_REQUEST, apiSaga);
  yield takeLatest(TYPE.TABLE_REQUEST, tableSaga);
  yield takeLatest(TYPE.COUNTRY_REQUEST, countrySaga);
  yield takeLatest(TYPE.CURRENCY_REQUEST, currencySaga);
  yield takeLatest(TYPE.CITY_REQUEST, citySaga);
  yield takeLatest(TYPE.CREATE_REQUEST, createSaga);
   yield takeLatest(TYPE.UPDATE_REQUEST, updateSaga);
  yield takeLatest(TYPE.GET_ID_REQUEST, getIdSaga);
}