import { all } from "redux-saga/effects";
import login from'./Loginsaga'
export default function* rootSaga(){
    yield all([
        login()
    ])
}

