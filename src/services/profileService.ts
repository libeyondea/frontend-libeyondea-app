import { AxiosResponse } from 'axios';

import { Profile, UpdateProfile } from 'src/types/profile';
import { DataResponse } from 'src/types/response';
import http from 'src/utils/http';

const profileService = {
	show: (): Promise<AxiosResponse<DataResponse<Profile>>> => {
		return http.get<DataResponse<Profile>>({
			url: '/profile'
		});
	},
	update: (data: UpdateProfile): Promise<AxiosResponse<DataResponse<Profile>>> => {
		return http.put<DataResponse<Profile>>({
			url: '/profile',
			data: data
		});
	}
};

export default profileService;
