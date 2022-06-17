import { AxiosResponse } from 'axios';

import config from 'config';
import http from 'helpers/http';
import { Image, UploadImage } from 'types/image';
import { ResponseData } from 'types/response';

const imageService = {
	upload: (files: UploadImage): Promise<AxiosResponse<ResponseData<Image>>> => {
		return http.upload<ResponseData<Image>>({
			url: config.API.END_POINT.UPLOAD_IMAGE,
			files: files
		});
	}
};

export default imageService;
