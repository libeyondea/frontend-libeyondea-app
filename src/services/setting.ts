import { AxiosResponse } from 'axios';

import config from 'src/config';
import http from 'src/helpers/http';
import { ResponseData } from 'src/types/response';
import { Setting, UpdateSetting } from 'src/types/setting';

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
