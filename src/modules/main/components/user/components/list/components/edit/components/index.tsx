import CardComponent from 'components/Card/components';
import { useNavigate, useParams } from 'react-router-dom';
import * as userConstant from 'constants/user';
import * as Yup from 'yup';
import userService from 'services/userService';
import imageService from 'services/imageService';
import { useCallback, useRef, useState } from 'react';
import { UpdateUserFormik } from 'models/user';
import LoadingComponent from 'components/Loading/components';
import toastify from 'helpers/toastify';
import { Image } from 'models/image';
import FormComponent from 'components/Form/components';
import { FormikHelpers } from 'formik';
import { errorHandler } from 'helpers/error';
import * as routeConstant from 'constants/route';
import useAppDispatch from 'hooks/useAppDispatch';
import { userShowDataRequestAction, userShowLoadingRequestAction, userUpdateDataRequestAction, userUpdateLoadingRequestAction } from 'store/user/actions';
import useAppSelector from 'hooks/useAppSelector';
import { selectUserShow, selectUserUpdate } from 'store/user/selectors';
import useOnClickOutside from 'hooks/useClickOutside';
import useLockedScroll from 'hooks/useLockedScroll';
import ButtonComponent from 'components/Button/components';
import useOnceEffect from 'hooks/useOnceEffect';
import useUpdateEffect from 'hooks/useUpdateEffect';

type Props = {};

const EditListUserComponent: React.FC<Props> = () => {
	const outsideRef = useRef(null);
	const navigate = useNavigate();
	const params = useParams();
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
		first_name: Yup.string().required('The first name is required.').max(20, 'The first name must not be greater than 20 characters.'),
		last_name: Yup.string().required('The last name is required.').max(20, 'The last name must not be greater than 20 characters.'),
		email: Yup.string().required('Email is required.'),
		user_name: Yup.string()
			.required('The user name is required.')
			.min(3, 'The user name must be at least 3 characters.')
			.max(20, 'The user name must not be greater than 20 characters.'),
		password: Yup.string().min(6, 'The password must be at least 6 characters.').max(66, 'The password must not be greater than 66 characters.'),
		password_confirmation: Yup.string().test('passwords-match', 'The password confirmation does not match.', function (value) {
			return this.parent.password === value;
		}),
		role: Yup.string()
			.required('The role is required.')
			.oneOf(
				[userConstant.USER_ROLE_OWNER, userConstant.USER_ROLE_ADMIN, userConstant.USER_ROLE_MODERATOR, userConstant.USER_ROLE_MEMBER],
				'The role invalid.'
			),
		status: Yup.string()
			.required('The status is required.')
			.oneOf([userConstant.USER_STATUS_ACTIVE, userConstant.USER_STATUS_INACTIVE, userConstant.USER_STATUS_BANNED], 'The status invalid.')
	});

	const onSubmit = (values: UpdateUserFormik, formikHelpers: FormikHelpers<UpdateUserFormik>) => {
		new Promise<Image | null>((resolve, reject) => {
			if (!values.image) {
				return resolve(null);
			}
			setImageUpload({ loading: true });
			imageService
				.upload({
					image: values.image
				})
				.then((response) => {
					return resolve(response.data.data);
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
					...(result && {
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
							(validationError) => formikHelpers.setErrors(validationError.data.errors),
							(stockError) => {}
						)
					)
					.finally(() => {
						dispatch(userUpdateLoadingRequestAction(false));
					});
			})
			.catch(
				errorHandler(
					(axiosError) => {},
					(validationError) => formikHelpers.setErrors(validationError.data.errors),
					(stockError) => {}
				)
			)
			.finally(() => {});
	};

	const userShowDataCallback = useCallback(() => {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.userId]);

	useOnceEffect(() => {
		userShowDataCallback();
	});

	useUpdateEffect(() => {
		userShowDataCallback();
	}, [userShowDataCallback]);

	useOnClickOutside(outsideRef, () => {
		navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`);
	});

	useLockedScroll();

	return (
		<div className="h-full w-full fixed overflow-x-hidden overflow-y-auto z-50 top-0 left-0">
			<div className="min-h-full flex items-center py-8 sm:px-16 bg-gray-900/50 z-40 justify-center">
				<CardComponent
					ref={outsideRef}
					className="max-w-5xl z-50"
					header="Edit user"
					redirectCloseUrl={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`}
				>
					{userShow.loading ? (
						<LoadingComponent />
					) : !Object.keys(userShow.data).length ? (
						<div className="flex justify-center">Empty user</div>
					) : (
						<FormComponent<UpdateUserFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
							{(props) => (
								<div className="grid grid-cols-2 gap-4">
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Input
											type="text"
											label="First name"
											placeholder="Enter first name"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.first_name}
											isError={!!(props.errors.first_name && props.touched.first_name)}
											errorMessage={props.errors.first_name}
											name="first_name"
											id="first_name"
										/>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Input
											type="text"
											label="Last name"
											placeholder="Enter last name"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.last_name}
											isError={!!(props.errors.last_name && props.touched.last_name)}
											errorMessage={props.errors.last_name}
											name="last_name"
											id="last_name"
										/>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Input
											type="text"
											label="User name"
											placeholder="Enter user name"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.user_name}
											isError={!!(props.errors.user_name && props.touched.user_name)}
											errorMessage={props.errors.user_name}
											name="user_name"
											id="user_name"
										/>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Input
											type="text"
											label="Email"
											placeholder="Enter email"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.email}
											isError={!!(props.errors.email && props.touched.email)}
											errorMessage={props.errors.email}
											name="email"
											id="email"
										/>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Input
											type="password"
											label="Password"
											placeholder="Enter password"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.password}
											isError={!!(props.errors.password && props.touched.password)}
											errorMessage={props.errors.password}
											name="password"
											id="password"
										/>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Input
											type="password"
											label="Password confirmation"
											placeholder="Enter password confirmation"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.password_confirmation}
											isError={!!(props.errors.password_confirmation && props.touched.password_confirmation)}
											errorMessage={props.errors.password_confirmation}
											name="password_confirmation"
											id="password_confirmation"
										/>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Select
											label="Role"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.role}
											isError={!!(props.errors.role && props.touched.role)}
											errorMessage={props.errors.role}
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
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.status}
											isError={!!(props.errors.status && props.touched.status)}
											errorMessage={props.errors.status}
											name="status"
											id="status"
										>
											{[userConstant.USER_STATUS_INACTIVE, userConstant.USER_STATUS_ACTIVE, userConstant.USER_STATUS_BANNED].map(
												(status, index) => (
													<option value={status} key={index}>
														{status}
													</option>
												)
											)}
										</FormComponent.Select>
									</div>
									<div className="col-span-2 md:col-span-1">
										<FormComponent.Image
											id="image"
											name="image"
											label="Avatar"
											isError={!!(props.errors.image && props.touched.image)}
											errorMessage={props.errors.image}
											onChangeFile={props.setFieldValue}
											onBlurFile={props.setFieldTouched}
											imgUrl={userShow.data.avatar_url}
										/>
									</div>
									<div className="col-span-2 flex flex-row-reverse">
										<ButtonComponent loading={imageUpload.loading || userUpdate.loading} disabled={imageUpload.loading || userUpdate.loading}>
											{imageUpload.loading ? 'Uploading' : userUpdate.loading ? 'Updating' : 'Submit'}
										</ButtonComponent>
									</div>
								</div>
							)}
						</FormComponent>
					)}
				</CardComponent>
			</div>
		</div>
	);
};

export default EditListUserComponent;
