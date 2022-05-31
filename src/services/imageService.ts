import http from 'helpers/http';
import config from 'config';
import { ResponseData } from 'models/response';
import { Image, UploadImage } from 'models/image';
import { AxiosResponse } from 'axios';

const imageService = {
	upload: (files: UploadImage): Promise<AxiosResponse<ResponseData<Image>>> => {
		return http.upload<ResponseData<Image>>({
			url: config.API.END_POINT.UPLOAD_IMAGE,
			files: files
		});
	}
};

export default imageService;
