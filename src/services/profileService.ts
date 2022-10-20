import { AxiosResponse } from 'axios';

import { Profile, UpdateProfile } from 'src/types/profile';
import { ResponseData } from 'src/types/response';
import http from 'src/utils/http';

const profileService = {
	show: (): Promise<AxiosResponse<ResponseData<Profile>>> => {
		return http.get<ResponseData<Profile>>({
			url: '/profile'
		});
	},
	update: (data: UpdateProfile): Promise<AxiosResponse<ResponseData<Profile>>> => {
		return http.put<ResponseData<Profile>>({
			url: '/profile',
			data: data
		});
	}
};

export default profileService;
