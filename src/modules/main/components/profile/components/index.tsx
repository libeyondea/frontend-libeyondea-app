import { FormikHelpers } from 'formik';
import { Fragment, useState } from 'react';
import * as Yup from 'yup';

import BreadcrumbComponent from 'src/components/Breadcrumb/components';
import ButtonComponent from 'src/components/Button/components';
import CardComponent from 'src/components/Card/components';
import FormComponent from 'src/components/Form/components';
import { SpinLoadingComponent } from 'src/components/Loading/components';
import errorHandler from 'src/helpers/errorHandler';
import toastify from 'src/helpers/toastify';
import useAppDispatch from 'src/hooks/useAppDispatch';
import useAppSelector from 'src/hooks/useAppSelector';
import useOnceEffect from 'src/hooks/useOnceEffect';
import imageService from 'src/services/imageService';
import profileService from 'src/services/profileService';
import {
	profileShowDataRequestAction,
	profileShowLoadingRequestAction,
	profileUpdateDataRequestAction,
	profileUpdateLoadingRequestAction
} from 'src/store/profile/actions';
import { selectProfileShow, selectProfileUpdate } from 'src/store/profile/selectors';
import { Image } from 'src/types/image';
import { UpdateProfileFormik } from 'src/types/profile';

const ProfileComponent = () => {
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
				dispatch(profileUpdateLoadingRequestAction(true));
				const payload = {
					first_name: values.first_name,
					last_name: values.last_name,
					email: values.email,
					user_name: values.user_name,
					...(values.password && {
						password: values.password
					}),
					...(result && {
						avatar: result.image_name
					})
				};
				profileService
					.update(payload)
					.then((response) => {
						dispatch(profileUpdateDataRequestAction(response.data.data));
						toastify.success('Profile updated successfully.');
					})
					.catch(
						errorHandler(undefined, (validationError) => {
							formikHelpers.setErrors(validationError.response?.data?.errors);
						})
					)
					.finally(() => {
						dispatch(profileUpdateLoadingRequestAction(false));
					});
			})
			.catch(
				errorHandler(undefined, (validationError) => {
					formikHelpers.setErrors(validationError.response?.data?.errors);
				})
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
					<CardComponent title="Profile">
						{profileShow.loading ? (
							<SpinLoadingComponent />
						) : !profileShow.data.id ? (
							<div className="flex justify-center">Not found.</div>
						) : (
							<FormComponent<UpdateProfileFormik>
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
								enableReinitialize
							>
								{(props) => (
									<div className="grid grid-cols-12 gap-4">
										<div className="col-span-12 sm:col-span-6">
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
										<div className="col-span-12 sm:col-span-6">
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
										<div className="col-span-12 sm:col-span-6">
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
										<div className="col-span-12 sm:col-span-6">
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
										<div className="col-span-12 sm:col-span-6">
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
										<div className="col-span-12 sm:col-span-6">
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
										<div className="col-span-12">
											<FormComponent.Image
												id="image"
												label="Image"
												error={props.errors.image}
												touched={props.touched.image}
												onChangeFile={props.setFieldValue}
												onBlurFile={props.setFieldTouched}
												imgUrl={profileShow.data.avatar_url}
												{...props.getFieldProps('image')}
											/>
										</div>
										<div className="col-span-12 flex flex-row-reverse">
											<ButtonComponent
												type="submit"
												loading={imageUpload.loading || profileUpdate.loading}
												disabled={imageUpload.loading || profileUpdate.loading}
											>
												{imageUpload.loading ? 'Uploading' : profileUpdate.loading ? 'Updating' : 'Update'}
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
