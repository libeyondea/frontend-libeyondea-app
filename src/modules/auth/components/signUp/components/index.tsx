import { FormikHelpers } from 'formik';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import ButtonComponent from 'src/components/Button/components';
import CardComponent from 'src/components/Card/components';
import FormComponent from 'src/components/Form/components';
import LinkComponent from 'src/components/Link/components';
import * as routeConstant from 'src/constants/route';
import errorHandler from 'src/helpers/errorHandler';
import toastify from 'src/helpers/toastify';
import authService from 'src/services/authService';
import { SignUpFormik } from 'src/types/auth';

const SignUpComponent = () => {
	const navigate = useNavigate();

	const initialValues: SignUpFormik = {
		first_name: '',
		last_name: '',
		email: '',
		user_name: '',
		password: '',
		password_confirmation: '',
		terms: false
	};

	const validationSchema = Yup.object({
		first_name: Yup.string().required('The first name is required').max(20, 'The first name must not be greater than 20 characters.'),
		last_name: Yup.string().required('The last name is required').max(20, 'The last name must not be greater than 20 characters.'),
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
		terms: Yup.boolean().oneOf([true], 'You must accept the terms.')
	});

	const onSubmit = (values: SignUpFormik, formikHelpers: FormikHelpers<SignUpFormik>) => {
		const payload = {
			first_name: values.first_name,
			last_name: values.last_name,
			email: values.email,
			user_name: values.user_name,
			password: values.password
		};
		authService
			.signUp(payload)
			.then((response) => {
				toastify.success('Signed up successfully.');
				navigate(`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGN_IN}`);
			})
			.catch(
				errorHandler(undefined, (validationError) => {
					formikHelpers.setErrors(validationError.response?.data?.errors);
				})
			)
			.finally(() => {
				formikHelpers.setSubmitting(false);
			});
	};

	return (
		<CardComponent className="m-auto max-w-md sm:p-8">
			<div className="text-xl font-light text-gray-600 sm:text-2xl text-center mb-8">Sign up your Account</div>
			<FormComponent<SignUpFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(props) => (
					<Fragment>
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
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
						<div className="flex items-center mb-6">
							<FormComponent.Checkbox
								id="terms"
								checked={props.values.terms}
								error={props.errors.terms}
								touched={props.touched.terms}
								{...props.getFieldProps('terms')}
							>
								By signing up, you agree to our{' '}
								<LinkComponent className="text-purple-600 font-medium" to="/">
									Terms
								</LinkComponent>{' '}
								,{' '}
								<LinkComponent className="text-purple-600 font-medium" to="/">
									Data Policy
								</LinkComponent>{' '}
								and{' '}
								<LinkComponent className="text-purple-600 font-medium" to="/">
									Cookies Policy
								</LinkComponent>
								.
							</FormComponent.Checkbox>
						</div>
						<div className="flex w-full">
							<ButtonComponent className="w-full" type="submit" loading={props.isSubmitting} disabled={props.isSubmitting}>
								{props.isSubmitting ? 'Signing up' : 'Sign up'}
							</ButtonComponent>
						</div>
					</Fragment>
				)}
			</FormComponent>
			<div className="relative my-6">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-400" />
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="px-2 text-neutral-700 bg-white leading-none"> Or continue with </span>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<span className="leading-none text-sm">
					Do you have an account?
					<LinkComponent className="text-purple-600 ml-1" to={`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGN_IN}`}>
						Sign in
					</LinkComponent>
				</span>
			</div>
		</CardComponent>
	);
};

export default SignUpComponent;
