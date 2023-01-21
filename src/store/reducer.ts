import { combineReducers } from 'redux';

import menuReducer from './slices/menu';
import snackbarReducer from './slices/snackbar';

const reducer = combineReducers({
	snackbar: snackbarReducer,
	menu: menuReducer
});

export default reducer;
