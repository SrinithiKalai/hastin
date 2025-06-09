import { combineReducers } from 'redux';
import { loginReducer } from './LoginReducer'
import { currencyReducer } from './CurrencyReducer';
import { countryReducer } from './CountryReducer';
import { cityReducer } from './CityReducer';
import { createReducer } from './CreateReducer';
import { userReducer } from './GetIdReducer';
const rootReducer = combineReducers({
    login : loginReducer,
    currency : currencyReducer,
    country : countryReducer,
    city : cityReducer,
    create : createReducer,
    user : userReducer
})

export default rootReducer;