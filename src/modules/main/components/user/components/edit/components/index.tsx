import axios, { AxiosError } from 'axios';
import BreadcrumbComponent from 'components/Breadcrumb/components';
import CardComponent from 'components/Card/components';
import { useParams } from 'react-router-dom';
import * as userConstant from 'constants/user';
import * as Yup from 'yup';
import userService from 'services/userService';
import classNames from 'classnames';
import imageService from 'services/imageService';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Fragment, useEffect, useState, useCallback } from 'react';
import { UpdateUserFormik, User } from 'models/user';
import LoadingComponent from 'components/Loading/components';
import toastify from 'helpers/toastify';
import { ResponseError } from 'models/response';
import { Image } from 'models/image';
import FormComponent from 'components/Form/components';
import { FormikHelpers } from 'formik';

type Props = {};

const EditUserComponent: React.FC<Props> = () => {
	const params = useParams();

	const [state, setState] = useState<{
		data: {
			user: User;
		};
		uploading: {
			user: boolean;
		};
		updating: {
			user: boolean;
		};
		loading: {
			user: boolean;
		};
	}>({
		data: {
			user: {} as User
		},
		uploading: {
			user: false
		},
		updating: {
			user: false
		},
		loading: {
			user: true
		}
	});

	const loadUser = useCallback(() => {
		setState((prevState) => ({
			...prevState,
			loading: {
				...prevState.loading,
				user: true
			}
		}));
		userService
			.show(Number(params.userId))
			.then((response) => {
				setState((prevState) => ({
					...prevState,
					data: {
						...prevState.data,
						user: response.data.data
					}
				}));
			})
			.catch((error) => {})
			.finally(() => {
				setState((prevState) => ({
					...prevState,
					loading: {
						...prevState.loading,
						user: false
					}
				}));
			});
	}, [params.userId]);

	const initialValues: UpdateUserFormik = {
		first_name: state.data.user.first_name || '',
		last_name: state.data.user.last_name || '',
		email: state.data.user.email || '',
		user_name: state.data.user.user_name || '',
		password: '',
		password_confirmation: '',
		role: state.data.user.role || userConstant.USER_ROLE_MEMBER,
		status: state.data.user.status || userConstant.USER_STATUS_INACTIVE,
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
			.min(6, 'The password must be at least 6 characters.')
			.max(66, 'The password must not be greater than 66 characters.'),
		password_confirmation: Yup.string().test(
			'passwords-match',
			'The password confirmation does not match.',
			function (value) {
				return this.parent.password === value;
			}
		),
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

	const onSubmit = (values: UpdateUserFormik, formikHelpers: FormikHelpers<UpdateUserFormik>) => {
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
					updating: {
						...prevState.updating,
						user: true
					}
				}));
				const payload = {
					first_name: values.first_name,
					last_name: values.last_name,
					email: values.email,
					user_name: values.user_name,
					role: values.role,
					status: values.status,
					...(values.password && {
						password: values.password
					}),
					...(result.image_name && {
						avatar: result.image_name
					})
				};
				userService
					.update(Number(params.userId), payload)
					.then((response) => {
						setState((prevState) => ({
							...prevState,
							data: {
								...prevState.data,
								user: response.data.data
							}
						}));
						toastify.success('Update user success');
					})
					.catch((error: Error | AxiosError<ResponseError>) => {
						if (axios.isAxiosError(error)) {
							if (error.response?.data.errors && error.response.status === 400) {
								formikHelpers.setErrors(error.response.data.errors);
							}
						}
					})
					.finally(() => {
						setState((prevState) => ({
							...prevState,
							updating: {
								...prevState.updating,
								user: false
							}
						}));
					});
			})
			.catch((error: Error | AxiosError<ResponseError>) => {
				if (axios.isAxiosError(error)) {
					if (error.response?.data.errors && error.response.status === 400) {
						formikHelpers.setErrors(error.response.data.errors);
					}
				}
			})
			.finally(() => {});
	};

	useEffect(() => {
		loadUser();
	}, [loadUser]);

	return (
		<Fragment>
			<BreadcrumbComponent className="mb-4">Edit user</BreadcrumbComponent>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 w-full">
					<CardComponent header="Edit user">
						{state.loading.user ? (
							<LoadingComponent />
						) : (
							<FormComponent<UpdateUserFormik>
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
								enableReinitialize
							>
								{(formik) => (
									<Fragment>
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
													isError={!!(formik.errors.first_name && formik.touched.email)}
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
													isError={!!(formik.errors.first_name && formik.touched.password_confirmation)}
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
													imgUrl={state.data.user.avatar_url}
												/>
											</div>
											<div className="col-span-2">
												<button
													type="submit"
													className={classNames(
														'flex items-center justify-center py-3 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md',
														{
															'cursor-not-allowed disabled:opacity-50':
																state.uploading.user || state.updating.user
														}
													)}
													disabled={state.uploading.user || state.updating.user}
												>
													{state.uploading.user ? (
														<Fragment>
															<AiOutlineLoading3Quarters className="animate-spin h-4 w-4 mr-2 font-medium" />
															<span>Uploading</span>
														</Fragment>
													) : state.updating.user ? (
														<Fragment>
															<AiOutlineLoading3Quarters className="animate-spin h-4 w-4 mr-2 font-medium" />
															<span>Updating</span>
														</Fragment>
													) : (
														<span>Submit</span>
													)}
												</button>
											</div>
										</div>
									</Fragment>
								)}
							</FormComponent>
						)}
					</CardComponent>
				</div>
			</div>
		</Fragment>
	);
};

export default EditUserComponent;
