import { AxiosResponse } from 'axios';

import { Image, UploadImage } from 'src/types/image';
import { DataResponse } from 'src/types/response';
import http from 'src/utils/http';

const imageService = {
	upload: (files: UploadImage): Promise<AxiosResponse<DataResponse<Image>>> => {
		return http.upload<DataResponse<Image>>({
			url: '/images/upload',
			files: files
		});
	}
};

export default imageService;
