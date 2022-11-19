import { FormikHelpers } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserForm from '../components/UserForm';
import * as routeConstant from 'src/constants/route';
import imageService from 'src/services/imageService';
import userService from 'src/services/userService';
import { useDispatch, useSelector } from 'src/store';
import { userCreateDataRequestAction, userCreateLoadingRequestAction } from 'src/store/user/actions';
import { selectUserCreate } from 'src/store/user/selectors';
import { CreateUpdateUserFormik } from 'src/types/user';
import errorHandler from 'src/utils/errorHandler';
import toastify from 'src/utils/toastify';

const NewUserPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userCreate = useSelector(selectUserCreate);
	const [imageUpload, setImageUpload] = useState({ loading: false });

	const onSubmit = (values: CreateUpdateUserFormik, formikHelpers: FormikHelpers<CreateUpdateUserFormik>) => {
		new Promise((resolve, reject) => {
			if (!values.image) {
				return resolve(null);
			}
			setImageUpload({ loading: true });
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
				.finally(() => {
					setImageUpload({ loading: false });
				});
		})
			.then(() => {
				dispatch(userCreateLoadingRequestAction(true));
				const payload = {
					first_name: values.first_name,
					last_name: values.last_name,
					email: values.email,
					user_name: values.user_name,
					role: values.role,
					status: values.status,
					password: values.password,
					avatar: values.avatar
				};
				userService
					.create(payload)
					.then((response) => {
						dispatch(userCreateDataRequestAction(response.data.data));
						toastify.success('User created successfully.');
						navigate(`/${routeConstant.ROUTE_NAME_USER}`);
					})
					.catch(
						errorHandler((error) => {
							if (error.type === 'validation-error') {
								formikHelpers.setErrors(error.error.response?.data?.errors);
							}
						})
					)
					.finally(() => {
						dispatch(userCreateLoadingRequestAction(false));
					});
			})
			.catch(
				errorHandler((error) => {
					if (error.type === 'validation-error') {
						formikHelpers.setErrors(error.error.response?.data?.errors);
					}
				})
			)
			.finally(() => {});
	};

	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="col-span-1">
				<UserForm onSubmit={onSubmit} submitting={imageUpload.loading || userCreate.loading} />
			</div>
		</div>
	);
};

export default NewUserPage;
