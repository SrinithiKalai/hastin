import { apiinFailure, apiSuccess, cityFailure, citySuccess, countryFailure, countrySuccess, createFailure, createSuccess, currencieFailure, currencieSuccess, getIdFailure, getIdSuccess, loginFailure, loginSuccess, tableFailure, tableSuccess, updateFailure, updateSuccess } from '../Action/LoginAction'
import { apiService, cityService, countryService, createService, currencieService, getIdService, loginService, tableService, updateService } from '../Service/LoginService'
import * as TYPE from '../Types'
import { call, put, takeLatest } from 'redux-saga/effects'

function* loginSaga({ payload }) {
  try {
    const loginResponse = yield call(loginService, payload);
    yield put(loginSuccess(loginResponse.data));
  }
  catch (err) {
    yield put(loginFailure(err))
  }
}

function* apiSaga({ payload }) {
  try {
    const loginResponse = yield call(apiService, payload);
    yield put(apiSuccess(loginResponse.data));
  }
  catch (err) {
    yield put(apiinFailure(err))
  }
}

function* tableSaga({ payload }) {
  try {
    const loginResponse = yield call(tableService, payload);
    yield put(tableSuccess(loginResponse.data));
  }
  catch (err) {
    yield put(tableFailure(err))
  }
}

function* countrySaga({ payload }) {
  try {
    const loginResponse = yield call(countryService, payload);
    yield put(countrySuccess(loginResponse.data));
  }
  catch (err) {
    yield put(countryFailure(err))
  }
}

function* currencieSaga({ payload }) {
  try {
    const loginResponse = yield call(currencieService, payload);
    yield put(currencieSuccess(loginResponse.data));
  }
  catch (err) {
    yield put(currencieFailure(err))
  }
}

function* citySaga({ payload }) {
  try {
    const loginResponse = yield call(cityService, payload);
    yield put(citySuccess(loginResponse.data));
  }
  catch (err) {
    yield put(cityFailure(err))
  }
}

function* createSaga({ payload }) {
  try {
    const loginResponse = yield call(createService, payload);
    yield put(createSuccess(loginResponse.data));
  }
  catch (err) {
    yield put(createFailure(err))
  }
}

function* getIdSaga({payload}) {
  try{
    const loginResponse = yield call(getIdService, payload);
    yield put(getIdSuccess(loginResponse.data));
  }
  catch(err) {
    yield put(getIdFailure(err))
  }
}

function* updateSaga({ payload }) {
  try {
    const loginResponse = yield call(updateService, payload);
    yield put(updateSuccess(loginResponse.data));
  }
  catch (err) {
    yield put(updateFailure(err))
  }
}

export default function* login() {
  yield takeLatest(TYPE.LOGIN_REQUEST, loginSaga);
  yield takeLatest(TYPE.API_REQUEST, apiSaga);
  yield takeLatest(TYPE.TABLE_REQUEST, tableSaga);
  yield takeLatest(TYPE.COUNTRY_REQUEST, countrySaga);
  yield takeLatest(TYPE.CURRENCIE_REQUEST, currencieSaga);
  yield takeLatest(TYPE.CITY_REQUEST, citySaga);
  yield takeLatest(TYPE.CREATE_REQUEST, createSaga);
  yield takeLatest(TYPE.GET_ID_REQUEST, getIdSaga);
  yield takeLatest(TYPE.HASTINUPDATE_REQUEST, updateSaga);
}