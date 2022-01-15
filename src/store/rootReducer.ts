import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './app/reducers';
import authReducer from './auth/reducers';

export default combineReducers({
	appState: appReducer,
	authState: authReducer
});
