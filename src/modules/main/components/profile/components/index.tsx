import BreadcrumbComponent from 'components/Breadcrumb/components';
import CardComponent from 'components/Card/components';
import * as Yup from 'yup';
import imageService from 'services/imageService';
import { Fragment, useState } from 'react';
import { UpdateProfileFormik } from 'models/profile';
import LoadingComponent from 'components/Loading/components';
import profileService from 'services/profileService';
import toastify from 'helpers/toastify';
import { Image } from 'models/image';
import FormComponent from 'components/Form/components';
import { FormikHelpers } from 'formik';
import { errorHandler } from 'helpers/error';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { selectProfileShow, selectProfileUpdate } from 'store/profile/selectors';
import {
	profileShowDataRequestAction,
	profileShowLoadingRequestAction,
	profileUpdateDataRequestAction,
	profileUpdateLoadingRequestAction
} from 'store/profile/actions';
import ButtonComponent from 'components/Button/components';
import useOnceEffect from 'hooks/useOnceEffect';

type Props = {};

const ProfileComponent: React.FC<Props> = () => {
	const dispatch = useAppDispatch();
	const profileShow = useAppSelector(selectProfileShow);
	const profileUpdate = useAppSelector(selectProfileUpdate);
	const [imageUpload, setImageUpload] = useState({ loading: false });

	const initialValues: UpdateProfileFormik = {
		first_name: profileShow.data.first_name || '',
		last_name: profileShow.data.last_name || '',
		email: profileShow.data.email || '',
		user_name: profileShow.data.user_name || '',
		password: '',
		password_confirmation: '',
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
		})
	});

	const onSubmit = (values: UpdateProfileFormik, formikHelpers: FormikHelpers<UpdateProfileFormik>) => {
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
				dispatch(profileUpdateLoadingRequestAction(true));
				const payload = {
					first_name: values.first_name,
					last_name: values.last_name,
					email: values.email,
					user_name: values.user_name,
					...(values.password && {
						password: values.password
					}),
					...(result.image_name && {
						avatar: result.image_name
					})
				};
				profileService
					.update(payload)
					.then((response) => {
						dispatch(profileUpdateDataRequestAction(response.data.data));
						toastify.success('Update profile success');
					})
					.catch(
						errorHandler(
							(axiosError) => {},
							(validationError) => formikHelpers.setErrors(validationError.data.errors),
							(stockError) => {}
						)
					)
					.finally(() => {
						dispatch(profileUpdateLoadingRequestAction(false));
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

	useOnceEffect(() => {
		dispatch(profileShowLoadingRequestAction(true));
		profileService
			.show()
			.then((response) => {
				dispatch(profileShowDataRequestAction(response.data.data));
			})
			.catch(errorHandler())
			.finally(() => {
				dispatch(profileShowLoadingRequestAction(false));
			});
	});

	return (
		<Fragment>
			<BreadcrumbComponent className="mb-4">Profile</BreadcrumbComponent>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 w-full">
					<CardComponent header="Profile">
						{profileShow.loading ? (
							<LoadingComponent />
						) : !Object.keys(profileShow.data).length ? (
							<div className="flex justify-center">Empty profile</div>
						) : (
							<FormComponent<UpdateProfileFormik>
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
								enableReinitialize
							>
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
											<FormComponent.Image
												id="image"
												name="image"
												label="Avatar"
												isError={!!(props.errors.image && props.touched.image)}
												errorMessage={props.errors.image}
												onChangeFile={props.setFieldValue}
												onBlurFile={props.setFieldTouched}
												imgUrl={profileShow.data.avatar_url}
											/>
										</div>
										<div className="col-span-2">
											<ButtonComponent
												loading={imageUpload.loading || profileUpdate.loading}
												disabled={imageUpload.loading || profileUpdate.loading}
											>
												{imageUpload.loading ? 'Uploading' : profileUpdate.loading ? 'Updating' : 'Submit'}
											</ButtonComponent>
										</div>
									</div>
								)}
							</FormComponent>
						)}
					</CardComponent>
				</div>
			</div>
		</Fragment>
	);
};

export default ProfileComponent;
