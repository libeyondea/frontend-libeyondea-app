import { FormikHelpers } from 'formik';
import { Fragment, useState } from 'react';
import * as Yup from 'yup';

import Button from 'src/components/Button';
import Card from 'src/components/Card';
import Form from 'src/components/Form';
import * as userConstant from 'src/constants/user';
import imageService from 'src/services/imageService';
import userService from 'src/services/userService';
import { useDispatch, useSelector } from 'src/store';
import {
	userCreateDataRequestAction,
	userCreateLoadingRequestAction,
	userListDataRequestAction,
	userListLoadingRequestAction,
	userListPaginationTotalRequestAction
} from 'src/store/user/actions';
import { selectUserCreate, selectUserList } from 'src/store/user/selectors';
import { Image } from 'src/types/image';
import { CreateUserFormik } from 'src/types/user';
import errorHandler from 'src/utils/errorHandler';
import toastify from 'src/utils/toastify';

const NewUserPage = () => {
	const dispatch = useDispatch();
	const userList = useSelector(selectUserList);
	const userCreate = useSelector(selectUserCreate);
	const [imageUpload, setImageUpload] = useState({ loading: false });

	const initialValues: CreateUserFormik = {
		first_name: '',
		last_name: '',
		email: '',
		user_name: '',
		password: '',
		password_confirmation: '',
		role: userConstant.USER_ROLE_MEMBER,
		actived: false,
		image: null
	};

	const validationSchema = Yup.object({
		first_name: Yup.string().required('The first name is required.').max(20, 'The first name must not be greater than 20 characters.'),
		last_name: Yup.string().required('The last name is required.').max(20, 'The last name must not be greater than 20 characters.'),
		email: Yup.string().required('Email is required.'),
		user_name: Yup.string()
			.required('The user name is required.')
			.min(3, 'The user name must be at least 3 characters.')
			.max(20, 'The user name must not be greater than 20 characters.'),
		password: Yup.string()
			.required('The password is required.')
			.min(6, 'The password must be at least 6 characters.')
			.max(66, 'The password must not be greater than 66 characters.'),
		password_confirmation: Yup.string()
			.required('The password confirmation is required.')
			.test('passwords-match', 'The password confirmation does not match.', function (value) {
				return this.parent.password === value;
			}),
		role: Yup.string()
			.required('The role is required.')
			.oneOf([...userConstant.USER_ROLE_ALL], 'The role invalid.'),
		actived: Yup.boolean()
	});

	const onSubmit = (values: CreateUserFormik, formikHelpers: FormikHelpers<CreateUserFormik>) => {
		new Promise<{ image: Image | null }>((resolve, reject) => {
			if (!values.image) {
				return resolve({ image: null });
			}
			setImageUpload({ loading: true });
			imageService
				.upload({
					image: values.image
				})
				.then((response) => {
					return resolve({
						image: response.data.data
					});
				})
				.catch((error) => {
					return reject(error);
				})
				.finally(() => {
					setImageUpload({ loading: false });
				});
		})
			.then((result) => {
				dispatch(userCreateLoadingRequestAction(true));
				const payload = {
					first_name: values.first_name,
					last_name: values.last_name,
					email: values.email,
					user_name: values.user_name,
					password: values.password,
					role: values.role,
					actived: values.actived,
					...(result.image && {
						avatar: result.image.name
					})
				};
				userService
					.create(payload)
					.then((response) => {
						dispatch(userCreateDataRequestAction(response.data.data));
						toastify.success('User created successfully.');
						dispatch(userListLoadingRequestAction(true));
						const payload = {
							page: userList.pagination.page,
							page_size: userList.pagination.page_size,
							keyword: userList.filter.keyword,
							sort_by: userList.filter.sort_by,
							sort_direction: userList.filter.sort_direction
						};
						userService
							.list(payload)
							.then((response) => {
								dispatch(userListDataRequestAction(response.data.data));
								dispatch(userListPaginationTotalRequestAction(response.data.pagination.total));
							})
							.catch(errorHandler())
							.finally(() => {
								dispatch(userListLoadingRequestAction(false));
							});
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
		<Fragment>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1">
					<Card title="New user">
						<Form<CreateUserFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
							{(props) => (
								<div className="grid grid-cols-12 gap-4">
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Input
											label="First name"
											error={Boolean(props.errors.first_name && props.touched.first_name)}
											helperText={props.errors.first_name}
											{...props.getFieldProps('first_name')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Input
											label="Last name"
											error={Boolean(props.errors.last_name && props.touched.last_name)}
											helperText={props.errors.last_name}
											{...props.getFieldProps('last_name')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Input
											label="User name"
											error={Boolean(props.errors.user_name && props.touched.user_name)}
											helperText={props.errors.user_name}
											autoComplete="username"
											{...props.getFieldProps('user_name')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Input
											label="Email"
											error={Boolean(props.errors.email && props.touched.email)}
											helperText={props.errors.email}
											{...props.getFieldProps('email')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Input
											type="password"
											label="Password"
											error={Boolean(props.errors.password && props.touched.password)}
											helperText={props.errors.password}
											autoComplete="new-password"
											{...props.getFieldProps('password')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Input
											type="password"
											label="Password confirmation"
											error={Boolean(props.errors.password_confirmation && props.touched.password_confirmation)}
											helperText={props.errors.password_confirmation}
											autoComplete="new-password"
											{...props.getFieldProps('password_confirmation')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Select
											label="Role"
											options={[...userConstant.USER_ROLE_ALL]}
											error={Boolean(props.errors.role && props.touched.role)}
											helperText={props.errors.role}
											{...props.getFieldProps('role')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Toggle
											label="Actived"
											checked={props.values.actived}
											error={Boolean(props.errors.actived && props.touched.actived)}
											helperText={props.errors.actived}
											{...props.getFieldProps('actived')}
										/>
									</div>
									<div className="col-span-12">
										<Form.Image
											label="Avatar"
											error={Boolean(props.errors.image && props.touched.image)}
											helperText={props.errors.image}
											onChangeFile={props.setFieldValue}
											onBlurFile={props.setFieldTouched}
											canDelete
											{...props.getFieldProps('image')}
										/>
									</div>
									<div className="col-span-12 flex flex-row-reverse">
										<Button type="submit" loading={imageUpload.loading || userCreate.loading}>
											{imageUpload.loading ? 'Uploading' : userCreate.loading ? 'Creating' : 'Create'}
										</Button>
									</div>
								</div>
							)}
						</Form>
					</Card>
				</div>
			</div>
		</Fragment>
	);
};

export default NewUserPage;
