import http from 'helpers/http';
import config from 'config';
import { ResponseData } from 'models/response';
import { Image, UploadImage } from 'models/image';

const imageService = {
	upload: (files: UploadImage) => {
		return http.upload<ResponseData<Image>>({
			url: config.API.END_POINT.UPLOAD_IMAGE,
			files: files
		});
	}
};

export default imageService;
