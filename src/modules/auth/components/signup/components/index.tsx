import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import CardComponent from 'components/Card/components';
import * as routeConstant from 'constants/route';
import { useNavigate } from 'react-router-dom';
import LinkComponent from 'components/Link/components';
import authService from 'services/authService';
import { SignupFormik } from 'types/auth';
import FormComponent from 'components/Form/components';
import { Fragment } from 'react';
import toastify from 'helpers/toastify';
import { errorHandler } from 'helpers/error';
import ButtonComponent from 'components/Button/components';

type Props = {};

const SignupComponent: React.FC<Props> = () => {
	const navigate = useNavigate();

	const initialValues: SignupFormik = {
		first_name: '',
		last_name: '',
		email: '',
		user_name: '',
		password: '',
		password_confirmation: '',
		terms: false
	};

	const validationSchema = Yup.object({
		first_name: Yup.string().required('The first name is required').max(20, 'The first name must not be greater than 20 characters'),
		last_name: Yup.string().required('The last name is required').max(20, 'The last name must not be greater than 20 characters'),
		email: Yup.string().required('Email is required'),
		user_name: Yup.string()
			.required('The user name is required')
			.min(3, 'The user name must be at least 3 characters')
			.max(20, 'The user name must not be greater than 20 characters'),
		password: Yup.string()
			.required('The password is required')
			.min(6, 'The password must be at least 6 characters')
			.max(66, 'The password must not be greater than 66 characters'),
		password_confirmation: Yup.string()
			.required('The password confirmation is required')
			.test('passwords-match', 'The password confirmation does not match.', function (value) {
				return this.parent.password === value;
			}),
		terms: Yup.boolean().oneOf([true], 'You must accept the terms')
	});

	const onSubmit = (values: SignupFormik, formikHelpers: FormikHelpers<SignupFormik>) => {
		const payload = {
			first_name: values.first_name,
			last_name: values.last_name,
			email: values.email,
			user_name: values.user_name,
			password: values.password
		};
		authService
			.signup(payload)
			.then((response) => {
				toastify.success('Sign up success');
				navigate(`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGNIN}`);
			})
			.catch(
				errorHandler(
					(axiosError) => {},
					(validationError) => formikHelpers.setErrors(validationError.data.errors),
					(stockError) => {}
				)
			)
			.finally(() => {
				formikHelpers.setSubmitting(false);
			});
	};

	return (
		<CardComponent className="m-auto flex flex-col w-full max-w-md sm:p-8">
			<div className="text-xl font-light text-gray-600 sm:text-2xl text-center mb-8">Sign up your Account</div>
			<FormComponent<SignupFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(props) => (
					<Fragment>
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
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
						<div className="flex items-center mb-6">
							<FormComponent.Checkbox
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								checked={props.values.terms}
								isError={!!(props.errors.terms && props.touched.terms)}
								errorMessage={props.errors.terms}
								name="terms"
								id="terms"
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
							<ButtonComponent className="w-full" loading={props.isSubmitting} disabled={props.isSubmitting}>
								{props.isSubmitting ? 'Signing up' : 'Sign up'}
							</ButtonComponent>
						</div>
					</Fragment>
				)}
			</FormComponent>
			<div className="relative my-6">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-400"></div>
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="px-2 text-neutral-700 bg-white leading-none"> Or continue with </span>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<span className="leading-none text-sm">
					Do you have an account?
					<LinkComponent className="text-purple-600 ml-1" to="/auth/signin">
						Sign in
					</LinkComponent>
				</span>
			</div>
		</CardComponent>
	);
};

export default SignupComponent;
