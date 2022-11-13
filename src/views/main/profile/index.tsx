import { FormikHelpers } from 'formik';
import _ from 'lodash';
import { useState } from 'react';
import { useEffectOnce } from 'react-use';
import * as Yup from 'yup';

import Button from 'src/components/Button';
import Card from 'src/components/Card';
import Form from 'src/components/Form';
import { SpinLoading } from 'src/components/Loading';
import imageService from 'src/services/imageService';
import profileService from 'src/services/profileService';
import { useDispatch, useSelector } from 'src/store';
import {
	profileShowDataRequestAction,
	profileShowLoadingRequestAction,
	profileUpdateDataRequestAction,
	profileUpdateLoadingRequestAction
} from 'src/store/profile/actions';
import { selectProfileShow, selectProfileUpdate } from 'src/store/profile/selectors';
import { UpdateProfileFormik } from 'src/types/profile';
import errorHandler from 'src/utils/errorHandler';
import toastify from 'src/utils/toastify';

const ProfilePage = () => {
	const dispatch = useDispatch();
	const profileShow = useSelector(selectProfileShow);
	const profileUpdate = useSelector(selectProfileUpdate);
	const [imageUpload, setImageUpload] = useState({ loading: false });

	const initialValues: UpdateProfileFormik = {
		first_name: profileShow.data.first_name || '',
		last_name: profileShow.data.last_name || '',
		email: profileShow.data.email || '',
		user_name: profileShow.data.user_name || '',
		password: '',
		password_confirmation: '',
		avatar: '',
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
		new Promise((resolve, reject) => {
			if (!values.image) {
				return resolve(null);
			}
			setImageUpload({ loading: true });
			imageService
				.upload({
					image: values.image
				})
				.then((response) => {
					values.avatar = response.data.data.name;
					return resolve(null);
				})
				.catch((error) => {
					return reject(error);
				})
				.finally(() => {
					setImageUpload({ loading: false });
				});
		})
			.then(() => {
				dispatch(profileUpdateLoadingRequestAction(true));
				const payload = {
					first_name: values.first_name,
					last_name: values.last_name,
					email: values.email,
					user_name: values.user_name,
					...(values.password && {
						password: values.password
					}),
					...(values.avatar && {
						avatar: values.avatar
					})
				};
				profileService
					.update(payload)
					.then((response) => {
						dispatch(profileUpdateDataRequestAction(response.data.data));
						toastify.success('Profile updated successfully.');
						_.delay(() => {
							window.location.reload();
						}, 600);
					})
					.catch(
						errorHandler((error) => {
							if (error.type === 'validation-error') {
								formikHelpers.setErrors(error.error.response?.data?.errors);
							}
						})
					)
					.finally(() => {
						dispatch(profileUpdateLoadingRequestAction(false));
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

	useEffectOnce(() => {
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
		<div className="grid grid-cols-1 gap-4">
			<div className="col-span-1">
				<Card title="Profile">
					{profileShow.loading ? (
						<SpinLoading />
					) : (
						<Form<UpdateProfileFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
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
									<div className="col-span-12 sm:col-span-6 lg:col-span-4">
										<Form.Input
											label="Last name"
											error={Boolean(props.errors.last_name && props.touched.last_name)}
											helperText={props.errors.last_name}
											{...props.getFieldProps('last_name')}
										/>
									</div>
									<div className="col-span-12 sm:col-span-6 lg:col-span-4">
										<Form.Input
											label="User name"
											error={Boolean(props.errors.user_name && props.touched.user_name)}
											helperText={props.errors.user_name}
											autoComplete="username"
											{...props.getFieldProps('user_name')}
										/>
									</div>
									<div className="col-span-12 sm:col-span-6 lg:col-span-4">
										<Form.Input
											label="Email"
											error={Boolean(props.errors.email && props.touched.email)}
											helperText={props.errors.email}
											{...props.getFieldProps('email')}
										/>
									</div>
									<div className="col-span-12 sm:col-span-6 lg:col-span-4">
										<Form.Input
											type="password"
											label="Password"
											error={Boolean(props.errors.password && props.touched.password)}
											helperText={props.errors.password}
											autoComplete="new-password"
											{...props.getFieldProps('password')}
										/>
									</div>
									<div className="col-span-12 sm:col-span-6 lg:col-span-4">
										<Form.Input
											type="password"
											label="Password confirmation"
											error={Boolean(props.errors.password_confirmation && props.touched.password_confirmation)}
											helperText={props.errors.password_confirmation}
											autoComplete="new-password"
											{...props.getFieldProps('password_confirmation')}
										/>
									</div>
									<div className="col-span-12">
										<Form.Image
											label="Image"
											error={Boolean(props.errors.image && props.touched.image)}
											helperText={props.errors.image}
											onChangeFile={props.setFieldValue}
											onBlurFile={props.setFieldTouched}
											imgUrl={profileShow.data.avatar}
											{...props.getFieldProps('image')}
										/>
									</div>
									<div className="col-span-12 flex flex-row-reverse">
										<Button
											type="submit"
											loading={imageUpload.loading || profileUpdate.loading}
											disabled={imageUpload.loading || profileUpdate.loading}
										>
											{imageUpload.loading || profileUpdate.loading ? 'Updating' : 'Update'}
										</Button>
									</div>
								</div>
							)}
						</Form>
					)}
				</Card>
			</div>
		</div>
	);
};

export default ProfilePage;
