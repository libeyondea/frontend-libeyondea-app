import http from 'helpers/http';
import config from 'config';
import { UpdateProfile, Profile } from 'models/profile';
import { ResponseData } from 'models/response';

const profileService = {
	show: () => {
		return http.get<ResponseData<Profile>>({
			url: config.API.END_POINT.PROFILE
		});
	},
	update: (data: UpdateProfile) => {
		return http.put<ResponseData<Profile>>({
			url: config.API.END_POINT.PROFILE,
			data: data
		});
	}
};

export default profileService;
