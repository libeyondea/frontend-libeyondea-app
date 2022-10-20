import { AxiosResponse } from 'axios';

import { Dashboard } from 'src/types/dashboard';
import { ResponseData } from 'src/types/response';
import http from 'src/utils/http';

const dashboardService = {
	show: (): Promise<AxiosResponse<ResponseData<Dashboard>>> => {
		return http.get<ResponseData<Dashboard>>({
			url: '/dashboard'
		});
	}
};

export default dashboardService;
