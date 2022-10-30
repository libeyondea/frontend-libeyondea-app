import { AxiosResponse } from 'axios';

import { DataResponse } from 'src/types/response';
import { Setting, UpdateSetting } from 'src/types/setting';
import http from 'src/utils/http';

const settingService = {
	show: (): Promise<AxiosResponse<DataResponse<Setting>>> => {
		return http.get<DataResponse<Setting>>({
			url: '/settings'
		});
	},
	update: (data: UpdateSetting): Promise<AxiosResponse<DataResponse<Setting>>> => {
		return http.put<DataResponse<Setting>>({
			url: '/settings',
			data: data
		});
	}
};

export default settingService;
