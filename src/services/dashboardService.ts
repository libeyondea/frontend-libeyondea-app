import { AxiosResponse } from 'axios';

import { Dashboard } from 'src/types/dashboard';
import { DataResponse } from 'src/types/response';
import http from 'src/utils/http';

const dashboardService = {
	show: (): Promise<AxiosResponse<DataResponse<Dashboard>>> => {
		return http.get<DataResponse<Dashboard>>({
			url: '/dashboard'
		});
	}
};

export default dashboardService;
