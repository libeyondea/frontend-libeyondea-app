// import { FormikHelpers } from 'formik';
import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import UserForm from '../components/UserForm';
import * as routeConstant from 'src/constants/route';
import imageService from 'src/services/imageService';
import userService from 'src/services/userService';
import { useDispatch, useSelector } from 'src/store';
import { userShowDataRequestAction, userShowLoadingRequestAction, userUpdateDataRequestAction, userUpdateLoadingRequestAction } from 'src/store/user/actions';
import { selectUserShow, selectUserUpdate } from 'src/store/user/selectors';
import { CreateUpdateUserFormik } from 'src/types/user';
import errorHandler from 'src/utils/errorHandler';
import toastify from 'src/utils/toastify';

const EditUserPage = () => {
	const [searchParams] = useSearchParams();
	const userId = searchParams.get('id');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userShow = useSelector(selectUserShow);
	const userUpdate = useSelector(selectUserUpdate);

	const onSubmit = (values: CreateUpdateUserFormik /* , formikHelpers: FormikHelpers<CreateUpdateUserFormik> */) => {
		new Promise((resolve, reject) => {
			dispatch(userUpdateLoadingRequestAction(true));
			if (!values.image) {
				return resolve(null);
			}
			imageService
				.upload({
					image: values.image
				})
				.then((response) => {
					values.avatar = response.data.data.name;
					return resolve(null);
				})
				.catch((error) => {
					return reject(error);
				})
				.finally(() => {});
		})
			.then(() =>
				userService.update(Number(userId), {
					first_name: values.first_name,
					last_name: values.last_name,
					email: values.email,
					user_name: values.user_name,
					role: values.role,
					status: values.status,
					password: values.password,
					avatar: values.avatar
				})
			)
			.then((response) => {
				dispatch(userUpdateDataRequestAction(response.data.data));
				toastify.success('User updated successfully.');
				navigate(`/${routeConstant.ROUTE_NAME_USER}`);
			})
			.catch(
				errorHandler((error) => {
					if (error.type === 'validation-error') {
						// formikHelpers.setErrors(error.error.response?.data?.errors);
					}
				})
			)
			.finally(() => {
				dispatch(userUpdateLoadingRequestAction(false));
			});
	};

	const userShowCallback = useCallback(() => {
		dispatch(userShowLoadingRequestAction(true));
		userService
			.show(Number(userId))
			.then((response) => {
				dispatch(userShowDataRequestAction(response.data.data));
			})
			.catch(errorHandler())
			.finally(() => {
				dispatch(userShowLoadingRequestAction(false));
			});
	}, [dispatch, userId]);

	useEffect(() => {
		userShowCallback();
	}, [userShowCallback]);

	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="col-span-1">
				<UserForm initialData={userShow} onSubmit={onSubmit} submitting={userUpdate.loading} isEdit />
			</div>
		</div>
	);
};

export default EditUserPage;
