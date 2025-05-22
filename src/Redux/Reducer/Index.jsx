import { combineReducers } from 'redux';
import { loginReducer } from './LoginReducer'
import { currencyReducer } from './CurrencyReducer';
import { CountryReducer } from './CountryReducer';
import { CityReducer } from './CityReducer';
import { CreateReducer } from './CeateReducer';
import { updateReducer } from './UpdateReducer';
import { getIdReducer } from './GetIdReducer';
const rootReducer = combineReducers({
    loginReducer,
    currencyReducer,
    CountryReducer,
    CityReducer,
    CreateReducer,
    getIdReducer,
    updateReducer
})

export default rootReducer;