import {all} from 'redux-saga/effects'
import SagaLogin from './LoginSaga'
export default function* rootSaga(){
    yield all([
        SagaLogin()
    ])
}