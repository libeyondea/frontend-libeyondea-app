import { AxiosResponse } from 'axios';

import config from 'src/config';
import { Image, UploadImage } from 'src/types/image';
import { ResponseData } from 'src/types/response';
import http from 'src/utils/http';

const imageService = {
	upload: (files: UploadImage): Promise<AxiosResponse<ResponseData<Image>>> => {
		return http.upload<ResponseData<Image>>({
			url: config.API.END_POINT.UPLOAD_IMAGE,
			files: files
		});
	}
};

export default imageService;
