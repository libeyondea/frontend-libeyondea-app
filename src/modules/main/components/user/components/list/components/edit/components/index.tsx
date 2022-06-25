import { FormikHelpers } from 'formik';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import ButtonComponent from 'src/components/Button/components';
import CardComponent from 'src/components/Card/components';
import FormComponent from 'src/components/Form/components';
import { SpinLoadingComponent } from 'src/components/Loading/components';
import * as routeConstant from 'src/constants/route';
import * as userConstant from 'src/constants/user';
import errorHandler from 'src/helpers/errorHandler';
import toastify from 'src/helpers/toastify';
import useAppDispatch from 'src/hooks/useAppDispatch';
import useAppSelector from 'src/hooks/useAppSelector';
import useLockedScroll from 'src/hooks/useLockedScroll';
import useOnceEffect from 'src/hooks/useOnceEffect';
import useUpdateEffect from 'src/hooks/useUpdateEffect';
import imageService from 'src/services/imageService';
import userService from 'src/services/userService';
import {
	userListDataRequestAction,
	userListLoadingRequestAction,
	userListPaginationTotalRequestAction,
	userShowDataRequestAction,
	userShowLoadingRequestAction,
	userUpdateDataRequestAction,
	userUpdateLoadingRequestAction
} from 'src/store/user/actions';
import { selectUserList, selectUserShow, selectUserUpdate } from 'src/store/user/selectors';
import { Image } from 'src/types/image';
import { UpdateUserFormik } from 'src/types/user';

const EditListUserComponent = () => {
	const navigate = useNavigate();
	const params = useParams();
	const dispatch = useAppDispatch();
	const userList = useAppSelector(selectUserList);
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
		actived: userShow.data.actived || false,
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
		actived: Yup.boolean()
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
					actived: values.actived,
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
						toastify.success('User updated successfully.');
						dispatch(userUpdateDataRequestAction(response.data.data));
						dispatch(userListLoadingRequestAction(true));
						const payload = {
							page: userList.pagination.page,
							limit: userList.pagination.limit,
							q: userList.filter.q,
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
						errorHandler(undefined, (validationError) => {
							formikHelpers.setErrors(validationError.response?.data?.errors);
						})
					)
					.finally(() => {
						dispatch(userUpdateLoadingRequestAction(false));
					});
			})
			.catch(
				errorHandler(undefined, (validationError) => {
					formikHelpers.setErrors(validationError.response?.data?.errors);
				})
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
	}, [dispatch, params.userId]);

	useOnceEffect(() => {
		userShowDataCallback();
	});

	useUpdateEffect(() => {
		userShowDataCallback();
	}, [userShowDataCallback]);

	useLockedScroll();

	return (
		<div className="h-full w-full fixed overflow-x-hidden overflow-y-auto z-50 top-0 left-0">
			<div className="min-h-full flex items-center py-8 sm:px-16 bg-gray-900/50 z-40 justify-center">
				<CardComponent
					className="max-w-5xl z-50"
					title="Edit user"
					onClickClose={() => navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`)}
				>
					{userShow.loading ? (
						<SpinLoadingComponent />
					) : !userShow.data.id ? (
						<div className="flex justify-center">Not found.</div>
					) : (
						<FormComponent<UpdateUserFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
							{(props) => (
								<div className="grid grid-cols-12 gap-4">
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<FormComponent.Input
											id="first_name"
											type="text"
											label="First name"
											placeholder="Enter first name"
											error={props.errors.first_name}
											touched={props.touched.first_name}
											{...props.getFieldProps('first_name')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<FormComponent.Input
											id="last_name"
											type="text"
											label="Last name"
											placeholder="Enter last name"
											error={props.errors.last_name}
											touched={props.touched.last_name}
											{...props.getFieldProps('last_name')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<FormComponent.Input
											id="user_name"
											type="text"
											label="User name"
											placeholder="Enter user name"
											error={props.errors.user_name}
											touched={props.touched.user_name}
											autoComplete="username"
											{...props.getFieldProps('user_name')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<FormComponent.Input
											id="email"
											type="text"
											label="Email"
											placeholder="Enter email"
											error={props.errors.email}
											touched={props.touched.email}
											{...props.getFieldProps('email')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<FormComponent.Input
											id="password"
											type="password"
											label="Password"
											placeholder="Enter password"
											error={props.errors.password}
											touched={props.touched.password}
											autoComplete="new-password"
											{...props.getFieldProps('password')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<FormComponent.Input
											id="password_confirmation"
											type="password"
											label="Password confirmation"
											placeholder="Enter password confirmation"
											error={props.errors.password_confirmation}
											touched={props.touched.password_confirmation}
											autoComplete="new-password"
											{...props.getFieldProps('password_confirmation')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<FormComponent.Select
											id="role"
											label="Role"
											options={[
												{
													value: userConstant.USER_ROLE_MEMBER,
													label: 'Member'
												},
												{
													value: userConstant.USER_ROLE_MODERATOR,
													label: 'Moderator'
												},
												{
													value: userConstant.USER_ROLE_ADMIN,
													label: 'Admin'
												},
												{
													value: userConstant.USER_ROLE_OWNER,
													label: 'Owner'
												}
											]}
											error={props.errors.role}
											touched={props.touched.role}
											{...props.getFieldProps('role')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<FormComponent.Toggle
											id="actived"
											label="Actived"
											checked={props.values.actived}
											error={props.errors.actived}
											touched={props.touched.actived}
											{...props.getFieldProps('actived')}
										/>
									</div>
									<div className="col-span-12">
										<FormComponent.Image
											id="image"
											label="Avatar"
											error={props.errors.image}
											touched={props.touched.image}
											onChangeFile={props.setFieldValue}
											onBlurFile={props.setFieldTouched}
											imgUrl={userShow.data.avatar_url}
											{...props.getFieldProps('image')}
										/>
									</div>
									<div className="col-span-12 flex flex-row-reverse">
										<ButtonComponent
											className="ml-4"
											type="submit"
											loading={imageUpload.loading || userUpdate.loading}
											disabled={imageUpload.loading || userUpdate.loading}
										>
											{imageUpload.loading ? 'Uploading' : userUpdate.loading ? 'Updating' : 'Update'}
										</ButtonComponent>
										<ButtonComponent
											styleType="light"
											onClick={() => navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`)}
										>
											Cancel
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
