import { legacy_createStore as createStore,compose,applyMiddleware,} from "redux";
 import createSagaMiiddleware  from "redux-saga";
import rootSaga from "./Saga/Index";
import rootReducer from "./Reducer/Index";
 
 const saga = createSagaMiiddleware();
 const composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
 export const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(saga))
 );
 saga.run(rootSaga);
 