import CardComponent from 'components/Card/components';
import { useNavigate } from 'react-router-dom';
import * as routeConstant from 'constants/route';
import * as userConstant from 'constants/user';
import * as Yup from 'yup';
import userService from 'services/userService';
import imageService from 'services/imageService';
import { useRef, useState } from 'react';
import { CreateUserFormik } from 'models/user';
import toastify from 'helpers/toastify';
import { Image } from 'models/image';
import FormComponent from 'components/Form/components';
import { FormikHelpers } from 'formik';
import { errorHandler } from 'helpers/error';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { selectUserCreate } from 'store/user/selectors';
import { userCreateDataRequestAction, userCreateLoadingRequestAction } from 'store/user/actions';
import useOnClickOutside from 'hooks/useClickOutside';
import useLockedScroll from 'hooks/useLockedScroll';
import ButtonComponent from 'components/Button/components';

type Props = {};

const NewListUserComponent: React.FC<Props> = () => {
	const outsideRef = useRef(null);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const userCreate = useAppSelector(selectUserCreate);
	const [imageUpload, setImageUpload] = useState({ loading: false });

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
			.required('The password confirmation is required')
			.test('passwords-match', 'The password confirmation does not match.', function (value) {
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

	const onSubmit = (values: CreateUserFormik, formikHelpers: FormikHelpers<CreateUserFormik>) => {
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
				dispatch(userCreateLoadingRequestAction(true));
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
						dispatch(userCreateDataRequestAction(response.data.data));
						toastify.success('Create user success');
						navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`);
					})
					.catch(
						errorHandler(
							(axiosError) => {},
							(formError) => formikHelpers.setErrors(formError.data.errors),
							(stockError) => {}
						)
					)
					.finally(() => {
						dispatch(userCreateLoadingRequestAction(false));
					});
			})
			.catch(
				errorHandler(
					(axiosError) => {},
					(formError) => formikHelpers.setErrors(formError.data.errors),
					(stockError) => {}
				)
			)
			.finally(() => {});
	};

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
					header="New user"
					redirectCloseUrl={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`}
				>
					<FormComponent<CreateUserFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
										canDelete
									/>
								</div>
								<div className="col-span-2 flex flex-row-reverse">
									<ButtonComponent loading={imageUpload.loading || userCreate.loading} disabled={imageUpload.loading || userCreate.loading}>
										{imageUpload.loading ? 'Uploading' : userCreate.loading ? 'Creating' : 'Submit'}
									</ButtonComponent>
								</div>
							</div>
						)}
					</FormComponent>
				</CardComponent>
			</div>
		</div>
	);
};

export default NewListUserComponent;
