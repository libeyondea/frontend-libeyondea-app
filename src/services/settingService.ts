import { AxiosResponse } from 'axios';

import { ResponseData } from 'src/types/response';
import { Setting, UpdateSetting } from 'src/types/setting';
import http from 'src/utils/http';

const settingService = {
	show: (): Promise<AxiosResponse<ResponseData<Setting>>> => {
		return http.get<ResponseData<Setting>>({
			url: '/settings'
		});
	},
	update: (data: UpdateSetting): Promise<AxiosResponse<ResponseData<Setting>>> => {
		return http.put<ResponseData<Setting>>({
			url: '/settings',
			data: data
		});
	}
};

export default settingService;
