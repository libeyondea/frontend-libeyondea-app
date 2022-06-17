import { RootState } from 'src/store';

export const selectAppInitialized = (state: RootState) => state.appState.initialized;

export const selectAppSidebar = (state: RootState) => state.appState.sidebar;
