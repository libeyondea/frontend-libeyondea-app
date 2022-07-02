import { RootState } from 'src/store';

export const selectDashboard = (state: RootState) => state.dashboardState;

export const selectDashboardShow = (state: RootState) => state.dashboardState.show;
