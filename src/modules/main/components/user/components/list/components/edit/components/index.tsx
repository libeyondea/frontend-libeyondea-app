import CardComponent from 'components/Card/components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as userConstant from 'constants/user';
import * as Yup from 'yup';
import userService from 'services/userService';
import imageService from 'services/imageService';
import { Fragment, useRef, useState } from 'react';
import { UpdateUserFormik } from 'models/user';
import LoadingComponent from 'components/Loading/components';
import toastify from 'helpers/toastify';
import { Image } from 'models/image';
import FormComponent from 'components/Form/components';
import { FormikHelpers } from 'formik';
import { errorHandler } from 'helpers/error';
import * as routeConstant from 'constants/route';
import useAppDispatch from 'hooks/useAppDispatch';
import {
	userShowDataRequestAction,
	userShowLoadingRequestAction,
	userUpdateDataRequestAction,
	userUpdateLoadingRequestAction
} from 'store/user/actions';
import useAppSelector from 'hooks/useAppSelector';
import { selectUserShow, selectUserUpdate } from 'store/user/selectors';
import useOutsideClick from 'hooks/useOutsideClick';
import useScrollLock from 'hooks/useScrollLock';
import useDidUpdateEffect from 'hooks/useDidUpdateEffect';
import ButtonComponent from 'components/Button/components';

type Props = {};

const EditListUserComponent: React.FC<Props> = () => {
	const wrapperRef = useRef(null);
	const cardRef = useRef(null);
	const navigate = useNavigate();
	const params = useParams();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const userShow = useAppSelector(selectUserShow);
	const userUpdate = useAppSelector(selectUserUpdate);
	const [imageUpload, setImageUpload] = useState({ loading: false });

	const initialValues: UpdateUserFormik = {
		first_name: userShow.data.first_name || '',
		last_name: userShow.data.last_name || '',
		email: userShow.data.email || '',
		user_name: userShow.data.user_name || '',
		password: '',
		password_confirmation: '',
		role: userShow.data.role || userConstant.USER_ROLE_MEMBER,
		status: userShow.data.status || userConstant.USER_STATUS_INACTIVE,
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
			setImageUpload({ loading: true });
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
					setImageUpload({ loading: false });
				});
		})
			.then((result) => {
				dispatch(userUpdateLoadingRequestAction(true));
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
						dispatch(userUpdateDataRequestAction(response.data.data));
						toastify.success('Update user success');
					})
					.catch(
						errorHandler(
							(axiosError) => {},
							(stockError) => {},
							(formError) => formikHelpers.setErrors(formError.data.errors)
						)
					)
					.finally(() => {
						dispatch(userUpdateLoadingRequestAction(false));
					});
			})
			.catch(
				errorHandler(
					(axiosError) => {
						console.log('axiosError');
					},
					(stockError) => {},
					(formError) => formikHelpers.setErrors(formError.data.errors)
				)
			)
			.finally(() => {});
	};

	useDidUpdateEffect(() => {
		dispatch(userShowLoadingRequestAction(true));
		userService
			.show(Number(params.userId))
			.then((response) => {
				dispatch(userShowDataRequestAction(response.data.data));
			})
			.catch(errorHandler())
			.finally(() => {
				dispatch(userShowLoadingRequestAction(false));
			});
	}, [params.userId]);

	useOutsideClick(
		() => {
			navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`);
		},
		wrapperRef,
		[wrapperRef]
	);

	useScrollLock(
		location.pathname ===
			`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}/${params.userId}/${routeConstant.ROUTE_NAME_MAIN_USER_EDIT}`,
		cardRef,
		[cardRef]
	);

	return (
		<div className="h-full w-full fixed overflow-x-hidden overflow-y-auto z-50 top-0 left-0">
			<div className="min-h-full flex items-center py-8 sm:p-16 bg-gray-900/50 z-40">
				<CardComponent
					ref={wrapperRef}
					className="z-50"
					header="Edit user"
					redirectCloseUrl={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`}
				>
					{userShow.loading ? (
						<LoadingComponent />
					) : !Object.keys(userShow.data).length ? (
						<div className="flex justify-center">Empty user</div>
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
													!!(
														formik.errors.password_confirmation &&
														formik.touched.password_confirmation
													)
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
												imgUrl={userShow.data.avatar_url}
											/>
										</div>
										<div className="col-span-2 flex flex-row-reverse">
											<ButtonComponent
												isLoading={imageUpload.loading || userUpdate.loading}
												disabled={imageUpload.loading || userUpdate.loading}
											>
												{imageUpload.loading ? 'Uploading' : userUpdate.loading ? 'Updating' : 'Submit'}
											</ButtonComponent>
										</div>
									</div>
								</Fragment>
							)}
						</FormComponent>
					)}
				</CardComponent>
			</div>
		</div>
	);
};

export default EditListUserComponent;
