import { combineReducers } from 'redux';
import { loginReducer } from './LoginReducer'
import { currencyReducer } from './CurrencyReducer';
import { countryReducer } from './CountryReducer';
import { cityReducer } from './CityReducer';
import { createReducer } from './CreateReducer';
import { updateReducer } from './UpdateReducer';
import { getIdReducer } from './GetIdReducer';
const rootReducer = combineReducers({
    login : loginReducer,
    currency : currencyReducer,
    country : countryReducer,
    city : cityReducer,
    create : createReducer,
    getId : getIdReducer,
    update : updateReducer
})

export default rootReducer;