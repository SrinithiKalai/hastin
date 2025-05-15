import { combineReducers } from "redux";
import { loginReducer } from "./LoginReducer";
import { cityReducer } from "./CityReducer";
import { createReducer } from "./CreateReducer";
import { countryReducer } from "./CountryReducer";
import { currencyReducer } from "./CurrencyReducer";

const rootReducer = combineReducers({
    login:loginReducer,
    city:cityReducer,
    country:countryReducer,
    currency:currencyReducer,
    create:createReducer
})

export default rootReducer;