import { createReducer } from '@reduxjs/toolkit';

import { settingShowDataSuccessAction, settingShowLoadingSuccessAction, settingUpdateDataSuccessAction, settingUpdateLoadingSuccessAction } from './actions';
import { ResponseDataReducer } from 'src/types/reducer';
import { Setting } from 'src/types/setting';

type SettingState = {
	show: ResponseDataReducer<Setting>;
	update: ResponseDataReducer<Setting>;
};

const initialState: SettingState = {
	show: {
		data: {} as Setting,
		loading: true
	},
	update: {
		data: {} as Setting,
		loading: false
	}
};

const settingReducer = createReducer(initialState, (builder) => {
	builder.addCase(settingShowDataSuccessAction, (state, action) => ({
		...state,
		show: {
			...state.show,
			data: action.payload
		}
	}));
	builder.addCase(settingShowLoadingSuccessAction, (state, action) => ({
		...state,
		show: {
			...state.show,
			loading: action.payload
		}
	}));

	builder.addCase(settingUpdateDataSuccessAction, (state, action) => ({
		...state,
		update: {
			...state.update,
			data: action.payload
		}
	}));
	builder.addCase(settingUpdateLoadingSuccessAction, (state, action) => ({
		...state,
		update: {
			...state.update,
			loading: action.payload
		}
	}));
});

export default settingReducer;
