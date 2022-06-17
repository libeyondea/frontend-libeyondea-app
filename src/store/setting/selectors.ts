import { RootState } from 'src/store';

export const selectSetting = (state: RootState) => state.settingState;

export const selectSettingShow = (state: RootState) => state.settingState.show;

export const selectSettingUpdate = (state: RootState) => state.settingState.update;
