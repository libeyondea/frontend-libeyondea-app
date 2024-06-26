import { RootState } from 'src/store';

export const selectAuth = (state: RootState) => state.authState;

export const selectAuthCurrent = (state: RootState) => state.authState.current;

export const selectIsAuth = (state: RootState) => Boolean(state.authState.current.data && state.authState.current.data.token);
