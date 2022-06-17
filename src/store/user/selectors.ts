import { RootState } from 'src/store';

export const selectUser = (state: RootState) => state.userState;

export const selectUserList = (state: RootState) => state.userState.list;

export const selectUserShow = (state: RootState) => state.userState.show;

export const selectUserCreate = (state: RootState) => state.userState.create;

export const selectUserUpdate = (state: RootState) => state.userState.update;

export const selectUserDelete = (state: RootState) => state.userState.delete;
