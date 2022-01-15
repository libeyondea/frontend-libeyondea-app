import { RootState } from 'store';

export const selectAuthCurrent = (state: RootState) => state.authState.current;

export const selectIsAuth = (state: RootState) => !!(state.authState.current && state.authState.current.token);
