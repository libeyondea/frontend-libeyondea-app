import { RootState } from 'src/store';

export const selectProfile = (state: RootState) => state.profileState;

export const selectProfileShow = (state: RootState) => state.profileState.show;

export const selectProfileUpdate = (state: RootState) => state.profileState.update;
