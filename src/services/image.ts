import { AxiosResponse } from 'axios';

import config from 'src/config';
import http from 'src/helpers/http';
import { Image, UploadImage } from 'src/types/image';
import { ResponseData } from 'src/types/response';

const imageService = {
	upload: (files: UploadImage): Promise<AxiosResponse<ResponseData<Image>>> => {
		return http.upload<ResponseData<Image>>({
			url: config.API.END_POINT.UPLOAD_IMAGE,
			files: files
		});
	}
};

export default imageService;
