import http from 'helpers/http';
import config from 'config';
import { ResponseData } from 'types/response';
import { AxiosResponse } from 'axios';
import { Setting, UpdateSetting } from 'types/setting';

const settingService = {
	show: (): Promise<AxiosResponse<ResponseData<Setting>>> => {
		return http.get<ResponseData<Setting>>({
			url: config.API.END_POINT.SETTING
		});
	},
	update: (data: UpdateSetting): Promise<AxiosResponse<ResponseData<Setting>>> => {
		return http.put<ResponseData<Setting>>({
			url: config.API.END_POINT.SETTING,
			data: data
		});
	}
};

export default settingService;