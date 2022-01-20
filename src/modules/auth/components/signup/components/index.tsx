import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import CardComponent from 'components/Card/components';
import * as routeConstant from 'constants/route';
import { useNavigate } from 'react-router-dom';
import LinkComponent from 'components/Link/components';
import authService from 'services/authService';
import { FaRegUser } from 'react-icons/fa';
import { MdLockOutline, MdMailOutline } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import axios from 'axios';
import { SignupFormik } from 'models/auth';

type Props = {};

const SignupComponent: React.FC<Props> = () => {
	const navigate = useNavigate();

	const formik: FormikProps<SignupFormik> = useFormik<SignupFormik>({
		initialValues: {
			first_name: '',
			last_name: '',
			email: '',
			user_name: '',
			password: '',
			password_confirmation: ''
		},
		validationSchema: Yup.object({
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
				.required('The password confirmation is required')
		}),
		onSubmit: (values, { setSubmitting, setErrors }) => {
			authService.csrf().then((response) => {
				authService
					.signup(values)
					.then((response) => {
						navigate(`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGNIN}`);
					})
					.catch((error) => {
						if (axios.isAxiosError(error)) {
							if (error.response?.data.errors && error.response.status === 400) {
								setErrors(error.response.data.errors);
							}
						}
					})
					.finally(() => {
						setSubmitting(false);
					});
			});
		}
	});
	return (
		<CardComponent className="m-auto flex flex-col w-full max-w-md sm:p-8">
			<div className="mb-6 text-xl font-light text-gray-600 sm:text-2xl text-center">Sign up your Account</div>
			<form onSubmit={formik.handleSubmit} className="mt-8">
				<div className="flex flex-col mb-4">
					<label htmlFor="first_name" className="block text-sm font-medium text-gray-600 mb-1">
						First name
					</label>
					<div className="flex relative">
						<span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
							<FaRegUser className="w-5 h-5" />
						</span>
						<input
							type="text"
							placeholder="Enter first name"
							className={classNames(
								'rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent',
								{
									'focus:ring-red-600': formik.errors.first_name && formik.touched.first_name
								}
							)}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.first_name}
							name="first_name"
							id="first_name"
						/>
					</div>
					{formik.errors.first_name && formik.touched.first_name && (
						<div className="text-red-700 mt-1 text-sm">{formik.errors.first_name}</div>
					)}
				</div>
				<div className="flex flex-col mb-4">
					<label htmlFor="last_name" className="block text-sm font-medium text-gray-600 mb-1">
						Last name
					</label>
					<div className="flex relative">
						<span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
							<FaRegUser className="w-5 h-5" />
						</span>
						<input
							type="text"
							placeholder="Enter last name"
							className={classNames(
								'rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent',
								{
									'focus:ring-red-600': formik.errors.last_name && formik.touched.last_name
								}
							)}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.last_name}
							name="last_name"
							id="last_name"
						/>
					</div>
					{formik.errors.last_name && formik.touched.last_name && (
						<div className="text-red-700 mt-1 text-sm">{formik.errors.last_name}</div>
					)}
				</div>
				<div className="flex flex-col mb-4">
					<label htmlFor="user_name" className="block text-sm font-medium text-gray-600 mb-1">
						User name
					</label>
					<div className="flex relative">
						<span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
							<FaRegUser className="w-5 h-5" />
						</span>
						<input
							type="text"
							placeholder="Enter user name"
							className={classNames(
								'rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent',
								{
									'focus:ring-red-600': formik.errors.user_name && formik.touched.user_name
								}
							)}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.user_name}
							name="user_name"
							id="user_name"
						/>
					</div>
					{formik.errors.user_name && formik.touched.user_name && (
						<div className="text-red-700 mt-1 text-sm">{formik.errors.user_name}</div>
					)}
				</div>
				<div className="flex flex-col mb-4">
					<label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
						Email
					</label>
					<div className="flex relative">
						<span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
							<MdMailOutline className="w-5 h-5" />
						</span>
						<input
							type="text"
							placeholder="Enter email"
							className={classNames(
								'rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent',
								{
									'focus:ring-red-600': formik.errors.email && formik.touched.email
								}
							)}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.email}
							name="email"
							id="email"
						/>
					</div>
					{formik.errors.email && formik.touched.email && (
						<div className="text-red-700 mt-1 text-sm">{formik.errors.email}</div>
					)}
				</div>
				<div className="flex flex-col mb-4">
					<label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
						Password
					</label>
					<div className="flex relative">
						<span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
							<MdLockOutline className="w-5 h-5" />
						</span>
						<input
							type="password"
							placeholder="Enter password"
							className={classNames(
								'rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent',
								{
									'focus:ring-red-600': formik.errors.password && formik.touched.password
								}
							)}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
							name="password"
							id="password"
						/>
					</div>
					{formik.errors.password && formik.touched.password && (
						<div className="text-red-700 mt-1 text-sm">{formik.errors.password}</div>
					)}
				</div>
				<div className="flex flex-col mb-4">
					<label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-600 mb-1">
						Password confirmation
					</label>
					<div className="flex relative">
						<span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
							<MdLockOutline className="w-5 h-5" />
						</span>
						<input
							type="password"
							placeholder="Enter password confirmation"
							className={classNames(
								'rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent',
								{
									'focus:ring-red-600':
										formik.errors.password_confirmation && formik.touched.password_confirmation
								}
							)}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password_confirmation}
							name="password_confirmation"
							id="password_confirmation"
						/>
					</div>
					{formik.errors.password_confirmation && formik.touched.password_confirmation && (
						<div className="text-red-700 mt-1 text-sm">{formik.errors.password_confirmation}</div>
					)}
				</div>
				<div className="flex items-center mb-6">
					<div className="flex">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							className="h-4 w-4 text-purple-600 checked:bg-purple-600 focus:ring-purple-500 border-gray-300 rounded"
						/>
						<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400 -mt-1">
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
						</label>
					</div>
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
							<>
								<AiOutlineLoading3Quarters className="animate-spin h-4 w-4 mr-2 font-medium" />
								<span>Signing up</span>
							</>
						) : (
							<span>Sign up</span>
						)}
					</button>
				</div>
			</form>
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
