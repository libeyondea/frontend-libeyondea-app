import { createReducer } from '@reduxjs/toolkit';
import { Setting } from 'types/setting';
import { ResponseDataReducer } from 'types/reducer';
import { settingShowDataSuccessAction, settingShowLoadingSuccessAction, settingUpdateDataSuccessAction, settingUpdateLoadingSuccessAction } from './actions';

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
