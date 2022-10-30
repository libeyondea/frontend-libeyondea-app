import { useMutation } from '@tanstack/react-query';

import profileService from 'src/services/profileService';
import { UpdateProfile } from 'src/types/profile';

const useProfileQuery = () => {
	const mUserUpdate = useMutation((payload: { data: UpdateProfile }) => profileService.update(payload.data));

	return { mUserUpdate };
};

export default useProfileQuery;
