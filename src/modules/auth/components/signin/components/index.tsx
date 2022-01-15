import { setCookie } from 'helpers/cookies';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import CardComponent from 'common/components/Card/components';
import * as cookiesConstant from 'constants/cookies';
import * as routeConstant from 'constants/route';
import config from 'config';
import { useNavigate, useLocation, Location } from 'react-router-dom';
import LinkComponent from 'common/components/Link/components';
import authService from 'services/authService';
import { MdLockOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import axios from 'axios';
import { SigninFormik } from 'models/auth';

type Props = {};

const SigninCompoment: React.FC<Props> = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = (location.state as { from: Location })?.from;

	const formik: FormikProps<SigninFormik> = useFormik<SigninFormik>({
		initialValues: {
			user_name: '',
			password: ''
		},
		validationSchema: Yup.object({
			user_name: Yup.string().required('The user name is required.'),
			password: Yup.string().required('The password is required.')
		}),
		onSubmit: (values, { setSubmitting, setErrors }) => {
			authService.csrf().then((response) => {
				authService
					.signin(values)
					.then((response) => {
						setCookie(cookiesConstant.COOKIES_KEY_TOKEN, response.data.data.token, {
							expires: config.AUTH_DATA.EXPIRED_TIME
						});
						navigate(routeConstant.ROUTE_NAME_SPLASH, { state: { from: from } });
					})
					.catch((error) => {
						if (axios.isAxiosError(error)) {
							if (error.response?.status === 422) {
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
			<div className="mb-6 text-xl font-light text-gray-600 sm:text-2xl text-center">Sign in to your Account</div>
			<form onSubmit={formik.handleSubmit} className="mt-8">
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
						<div className="text-red-700 mt-1">{formik.errors.user_name}</div>
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
						<div className="text-red-700 mt-1">{formik.errors.password}</div>
					)}
				</div>
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							className="h-4 w-4 text-purple-600 checked:bg-purple-600 focus:ring-purple-500 border-gray-300 rounded"
						/>
						<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
							Remember me
						</label>
					</div>
					<div className="text-sm">
						<LinkComponent to="/" className="font-medium text-purple-600">
							Forgot your password?
						</LinkComponent>
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
								<span>Signing in</span>
							</>
						) : (
							<span>Sign in</span>
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
					<LinkComponent className="text-purple-600 ml-1" to="/auth/signup">
						Sign up
					</LinkComponent>
				</span>
			</div>
		</CardComponent>
	);
};

export default SigninCompoment;
