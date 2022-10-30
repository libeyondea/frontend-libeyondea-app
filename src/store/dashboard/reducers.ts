import { createReducer } from '@reduxjs/toolkit';

import { dashboardShowDataSuccessAction, dashboardShowLoadingSuccessAction } from './actions';
import { Dashboard } from 'src/types/dashboard';
import { DataReducer } from 'src/types/reducer';

type DashboardState = {
	show: DataReducer<Dashboard>;
	update: DataReducer<Dashboard>;
};

const initialState: DashboardState = {
	show: {
		data: {} as Dashboard,
		loading: true
	},
	update: {
		data: {} as Dashboard,
		loading: false
	}
};

const dashboardReducer = createReducer(initialState, (builder) => {
	builder.addCase(dashboardShowDataSuccessAction, (state, action) => ({
		...state,
		show: {
			...state.show,
			data: action.payload
		}
	}));
	builder.addCase(dashboardShowLoadingSuccessAction, (state, action) => ({
		...state,
		show: {
			...state.show,
			loading: action.payload
		}
	}));
});

export default dashboardReducer;
