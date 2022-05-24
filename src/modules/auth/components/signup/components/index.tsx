import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import CardComponent from 'components/Card/components';
import * as routeConstant from 'constants/route';
import { useNavigate } from 'react-router-dom';
import LinkComponent from 'components/Link/components';
import authService from 'services/authService';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { SignupFormik } from 'models/auth';
import FormComponent from 'components/Form/components';
import { Fragment } from 'react';
import toastify from 'helpers/toastify';
import { errorHandler } from 'helpers/error';

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
		first_name: Yup.string()
			.required('The first name is required')
			.max(20, 'The first name must not be greater than 20 characters'),
		last_name: Yup.string()
			.required('The last name is required')
			.max(20, 'The last name must not be greater than 20 characters'),
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
			.oneOf([Yup.ref('password')], 'The password confirmation does not match')
			.required('The password confirmation is required'),
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
				errorHandler((resAxios) => {
					if (resAxios.error.response?.data.errors && resAxios.error.response.status === 400) {
						formikHelpers.setErrors(resAxios.error.response.data.errors);
					}
				})
			)
			.finally(() => {
				formikHelpers.setSubmitting(false);
			});
	};

	return (
		<CardComponent className="m-auto flex flex-col w-full max-w-md sm:p-8">
			<div className="text-xl font-light text-gray-600 sm:text-2xl text-center mb-8">Sign up your Account</div>
			<FormComponent<SignupFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(formik) => (
					<Fragment>
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
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
						<div className="flex flex-col mb-4">
							<FormComponent.Input
								type="password"
								label="Password confirmation"
								placeholder="Enter password confirmation"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password_confirmation}
								isError={!!(formik.errors.password_confirmation && formik.touched.password_confirmation)}
								errorMessage={formik.errors.password_confirmation}
								name="password_confirmation"
								id="password_confirmation"
							/>
						</div>
						<div className="flex items-center mb-6">
							<FormComponent.Checkbox
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								checked={formik.values.terms}
								isError={!!(formik.errors.terms && formik.touched.terms)}
								errorMessage={formik.errors.terms}
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
							<button
								type="submit"
								className={classNames(
									'flex items-center justify-center py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg',
									{
										'cursor-not-allowed disabled:opacity-50': formik.isSubmitting
									}
								)}
								disabled={formik.isSubmitting}
							>
								{formik.isSubmitting ? (
									<Fragment>
										<AiOutlineLoading3Quarters className="animate-spin h-4 w-4 mr-2 font-medium" />
										<span>Signing up</span>
									</Fragment>
								) : (
									<span>Sign up</span>
								)}
							</button>
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
