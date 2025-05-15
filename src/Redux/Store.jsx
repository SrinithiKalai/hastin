import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./Saga/index"
import rootReducer from "./Reducer/Index"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()?.concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store