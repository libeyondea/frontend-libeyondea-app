import { useMutation } from '@tanstack/react-query';

import imageService from 'src/services/imageService';
import { UploadImage } from 'src/types/image';

const useImageQuery = () => {
	const mImageUpload = useMutation((payload: UploadImage) => imageService.upload(payload));

	return { mImageUpload };
};

export default useImageQuery;
