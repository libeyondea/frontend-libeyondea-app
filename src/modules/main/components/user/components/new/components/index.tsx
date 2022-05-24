import BreadcrumbComponent from 'components/Breadcrumb/components';
import CardComponent from 'components/Card/components';
import { useNavigate } from 'react-router-dom';
import * as routeConstant from 'constants/route';
import * as userConstant from 'constants/user';
import * as Yup from 'yup';
import userService from 'services/userService';
import classNames from 'classnames';
import imageService from 'services/imageService';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Fragment, useState } from 'react';
import { CreateUserFormik } from 'models/user';
import toastify from 'helpers/toastify';
import { Image } from 'models/image';
import FormComponent from 'components/Form/components';
import { FormikHelpers } from 'formik';
import { errorHandler } from 'helpers/error';

type Props = {};

const NewUserComponent: React.FC<Props> = () => {
	const navigate = useNavigate();

	const [state, setState] = useState<{
		uploading: {
			user: boolean;
		};
		creating: {
			user: boolean;
		};
	}>({
		uploading: {
			user: false
		},
		creating: {
			user: false
		}
	});

	const initialValues: CreateUserFormik = {
		first_name: '',
		last_name: '',
		email: '',
		user_name: '',
		password: '',
		password_confirmation: '',
		role: userConstant.USER_ROLE_MEMBER,
		status: userConstant.USER_STATUS_INACTIVE,
		image: null
	};

	const validationSchema = Yup.object({
		first_name: Yup.string()
			.required('The first name is required.')
			.max(20, 'The first name must not be greater than 20 characters.'),
		last_name: Yup.string()
			.required('The last name is required.')
			.max(20, 'The last name must not be greater than 20 characters.'),
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
			.oneOf([Yup.ref('password')], 'The password confirmation does not match.'),
		role: Yup.string()
			.required('The role is required.')
			.oneOf(
				[
					userConstant.USER_ROLE_OWNER,
					userConstant.USER_ROLE_ADMIN,
					userConstant.USER_ROLE_MODERATOR,
					userConstant.USER_ROLE_MEMBER
				],
				'The role invalid.'
			),
		status: Yup.string()
			.required('The status is required.')
			.oneOf(
				[userConstant.USER_STATUS_ACTIVE, userConstant.USER_STATUS_INACTIVE, userConstant.USER_STATUS_BANNED],
				'The status invalid.'
			)
	});

	const onSubmit = (values: CreateUserFormik, formikHelpers: FormikHelpers<CreateUserFormik>) => {
		new Promise<Image>((resolve, reject) => {
			if (!values.image) {
				return resolve({
					image_name: null,
					image_url: null
				});
			}
			setState((prevState) => ({
				...prevState,
				uploading: {
					...prevState.uploading,
					user: true
				}
			}));
			imageService
				.upload({
					image: values.image
				})
				.then((response) => {
					return resolve({
						image_name: response.data.data.image_name,
						image_url: response.data.data.image_url
					});
				})
				.catch((error) => {
					return reject(error);
				})
				.finally(() => {
					setState((prevState) => ({
						...prevState,
						uploading: {
							...prevState.uploading,
							user: false
						}
					}));
				});
		})
			.then((result) => {
				setState((prevState) => ({
					...prevState,
					creating: {
						...prevState.creating,
						user: true
					}
				}));
				const payload = {
					first_name: values.first_name,
					last_name: values.last_name,
					email: values.email,
					user_name: values.user_name,
					password: values.password,
					role: values.role,
					status: values.status,
					...(result.image_name && {
						avatar: result.image_name
					})
				};
				userService
					.create(payload)
					.then((response) => {
						toastify.success('Create user success');
						navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`);
					})
					.catch(
						errorHandler((resAxios) => {
							if (resAxios.error.response?.data.errors && resAxios.error.response.status === 400) {
								formikHelpers.setErrors(resAxios.error.response.data.errors);
							}
						})
					)
					.finally(() => {
						setState((prevState) => ({
							...prevState,
							creating: {
								...prevState.creating,
								user: false
							}
						}));
					});
			})
			.catch(
				errorHandler((resAxios) => {
					if (resAxios.error.response?.data.errors && resAxios.error.response.status === 400) {
						formikHelpers.setErrors(resAxios.error.response.data.errors);
					}
				})
			)
			.finally(() => {});
	};

	return (
		<Fragment>
			<BreadcrumbComponent className="mb-4">New user</BreadcrumbComponent>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 w-full">
					<CardComponent header="New user">
						<FormComponent<CreateUserFormik>
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={onSubmit}
						>
							{(formik) => (
								<div className="grid grid-cols-2 gap-4">
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Input
											type="text"
											label="First name"
											placeholder="Enter first name"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.first_name}
											isError={!!(formik.errors.first_name && formik.touched.first_name)}
											errorMessage={formik.errors.first_name}
											name="first_name"
											id="first_name"
										/>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Input
											type="text"
											label="Last name"
											placeholder="Enter last name"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.last_name}
											isError={!!(formik.errors.last_name && formik.touched.last_name)}
											errorMessage={formik.errors.last_name}
											name="last_name"
											id="last_name"
										/>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Input
											type="text"
											label="User name"
											placeholder="Enter user name"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.user_name}
											isError={!!(formik.errors.user_name && formik.touched.user_name)}
											errorMessage={formik.errors.user_name}
											name="user_name"
											id="user_name"
										/>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Input
											type="text"
											label="Email"
											placeholder="Enter email"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.email}
											isError={!!(formik.errors.email && formik.touched.email)}
											errorMessage={formik.errors.email}
											name="email"
											id="email"
										/>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Input
											type="password"
											label="Password"
											placeholder="Enter password"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.password}
											isError={!!(formik.errors.password && formik.touched.password)}
											errorMessage={formik.errors.password}
											name="password"
											id="password"
										/>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Input
											type="password"
											label="Password confirmation"
											placeholder="Enter password confirmation"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.password_confirmation}
											isError={
												!!(formik.errors.password_confirmation && formik.touched.password_confirmation)
											}
											errorMessage={formik.errors.password_confirmation}
											name="password_confirmation"
											id="password_confirmation"
										/>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Select
											label="Role"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.role}
											isError={!!(formik.errors.role && formik.touched.role)}
											errorMessage={formik.errors.role}
											name="role"
											id="role"
										>
											{[
												userConstant.USER_ROLE_MEMBER,
												userConstant.USER_ROLE_MODERATOR,
												userConstant.USER_ROLE_ADMIN,
												userConstant.USER_ROLE_OWNER
											].map((role, index) => (
												<option value={role} key={index}>
													{role}
												</option>
											))}
										</FormComponent.Select>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Select
											label="Status"
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.status}
											isError={!!(formik.errors.status && formik.touched.status)}
											errorMessage={formik.errors.status}
											name="status"
											id="status"
										>
											{[
												userConstant.USER_STATUS_INACTIVE,
												userConstant.USER_STATUS_ACTIVE,
												userConstant.USER_STATUS_BANNED
											].map((status, index) => (
												<option value={status} key={index}>
													{status}
												</option>
											))}
										</FormComponent.Select>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Image
											id="image"
											name="image"
											label="Avatar"
											isError={!!(formik.errors.image && formik.touched.image)}
											errorMessage={formik.errors.image}
											onChangeFile={formik.setFieldValue}
											onBlurFile={formik.setFieldTouched}
											canDelete
										/>
									</div>
									<div className="col-span-2">
										<button
											type="submit"
											className={classNames(
												'flex items-center justify-center py-3 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md',
												{
													'cursor-not-allowed disabled:opacity-50':
														state.uploading.user || state.creating.user
												}
											)}
											disabled={state.uploading.user || state.creating.user}
										>
											{state.uploading.user ? (
												<Fragment>
													<AiOutlineLoading3Quarters className="animate-spin h-4 w-4 mr-2 font-medium" />
													<span>Uploading</span>
												</Fragment>
											) : state.creating.user ? (
												<Fragment>
													<AiOutlineLoading3Quarters className="animate-spin h-4 w-4 mr-2 font-medium" />
													<span>Creating</span>
												</Fragment>
											) : (
												<span>Submit</span>
											)}
										</button>
									</div>
								</div>
							)}
						</FormComponent>
					</CardComponent>
				</div>
			</div>
		</Fragment>
	);
};

export default NewUserComponent;
