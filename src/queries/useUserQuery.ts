import { useMutation } from '@tanstack/react-query';

import userService from 'src/services/userService';
import { CreateUser, UpdateUser } from 'src/types/user';

const useUserQuery = () => {
	const mUserCreate = useMutation((payload: { data: CreateUser }) => userService.create(payload.data));

	const mUserUpdate = useMutation((payload: { id: number; data: UpdateUser }) => userService.update(payload.id, payload.data));

	const mUserDelete = useMutation((payload: { id: number }) => userService.delete(payload.id));

	return { mUserCreate, mUserUpdate, mUserDelete };
};

export default useUserQuery;
