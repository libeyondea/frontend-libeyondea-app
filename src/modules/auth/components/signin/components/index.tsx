import { setCookie } from 'helpers/cookies';
import { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import CardComponent from 'components/Card/components';
import * as cookiesConstant from 'constants/cookies';
import * as routeConstant from 'constants/route';
import config from 'config';
import { useNavigate, useLocation, Location } from 'react-router-dom';
import LinkComponent from 'components/Link/components';
import authService from 'services/authService';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import axios, { AxiosError } from 'axios';
import { SigninFormik } from 'models/auth';
import { ResponseError } from 'models/response';
import FormComponent from 'components/Form/components';
import { Fragment } from 'react';
import toastify from 'helpers/toastify';

type Props = {};

const SigninCompoment: React.FC<Props> = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = (location.state as { from: Location })?.from;

	const initialValues: SigninFormik = {
		user_name: '',
		password: '',
		remember_me: false
	};

	const validationSchema = Yup.object({
		user_name: Yup.string().required('The user name is required.'),
		password: Yup.string().required('The password is required.')
	});

	const onSubmit = (values: SigninFormik, formikHelpers: FormikHelpers<SigninFormik>) => {
		const payload = {
			user_name: values.user_name,
			password: values.password,
			remember_me: values.remember_me
		};
		authService
			.signin(payload)
			.then((response) => {
				setCookie(cookiesConstant.COOKIES_KEY_TOKEN, response.data.data.token, {
					expires: config.AUTH_DATA.EXPIRED_TIME
				});
				toastify.success('Sign in success');
				navigate(routeConstant.ROUTE_NAME_SPLASH, { state: { from: from } });
			})
			.catch((error: Error | AxiosError<ResponseError>) => {
				if (axios.isAxiosError(error)) {
					if (error.response?.data.errors && error.response.status === 400) {
						formikHelpers.setErrors(error.response.data.errors);
					}
				}
			})
			.finally(() => {
				formikHelpers.setSubmitting(false);
			});
	};

	return (
		<CardComponent className="m-auto flex flex-col w-full max-w-md sm:p-8">
			<div className="text-xl font-light text-gray-600 sm:text-2xl text-center mb-8">Sign in to your Account</div>
			<FormComponent<SigninFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(formik) => (
					<Fragment>
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
						<div className="flex items-center justify-between mb-6">
							<FormComponent.Checkbox
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								checked={formik.values.remember_me}
								isError={!!(formik.errors.remember_me && formik.touched.remember_me)}
								errorMessage={formik.errors.remember_me}
								name="remember_me"
								id="remember_me"
							>
								Remember me
							</FormComponent.Checkbox>
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
									<Fragment>
										<AiOutlineLoading3Quarters className="animate-spin h-4 w-4 mr-2 font-medium" />
										<span>Signing in</span>
									</Fragment>
								) : (
									<span>Sign in</span>
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
					<LinkComponent className="text-purple-600 ml-1" to="/auth/signup">
						Sign up
					</LinkComponent>
				</span>
			</div>
		</CardComponent>
	);
};

export default SigninCompoment;
