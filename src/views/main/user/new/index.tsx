// import { FormikHelpers } from 'formik';
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

	const onSubmit = (values: CreateUpdateUserFormik /* , formikHelpers: FormikHelpers<CreateUpdateUserFormik> */) => {
		new Promise((resolve, reject) => {
			dispatch(userCreateLoadingRequestAction(true));
			if (!values.image) {
				return resolve(null);
			}
			imageService
				.upload({
					image: values.image
				})
				.then((response) => {
					values.avatar = response.data.data.name;
					return resolve(response);
				})
				.catch((error) => {
					return reject(error);
				})
				.finally(() => {});
		})
			.then(() =>
				userService.create({
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
				dispatch(userCreateDataRequestAction(response.data.data));
				toastify.success('User created successfully.');
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
				dispatch(userCreateLoadingRequestAction(false));
			});
	};

	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="col-span-1">
				<UserForm onSubmit={onSubmit} submitting={userCreate.loading} />
			</div>
		</div>
	);
};

export default NewUserPage;
