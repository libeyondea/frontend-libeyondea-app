import { AxiosResponse } from 'axios';

import config from 'src/config';
import http from 'src/helpers/http';
import { Dashboard } from 'src/types/dashboard';
import { ResponseData } from 'src/types/response';

const dashboardService = {
	show: (): Promise<AxiosResponse<ResponseData<Dashboard>>> => {
		return http.get<ResponseData<Dashboard>>({
			url: config.API.END_POINT.DASHBOARD
		});
	}
};

export default dashboardService;
