import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/login.reducer';

const AllReducer = {
	loginReducer
};

const rootReducer = combineReducers(AllReducer);
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
