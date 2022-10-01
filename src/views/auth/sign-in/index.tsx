import { FormikHelpers } from 'formik';
import { Fragment } from 'react';
import * as Yup from 'yup';

import Button from 'src/components/Button';
import Card from 'src/components/Card';
import Form from 'src/components/Form';
import Link from 'src/components/Link';
import config from 'src/config';
import * as cookiesConstant from 'src/constants/cookies';
import * as routeConstant from 'src/constants/route';
import authService from 'src/services/authService';
import { useDispatch } from 'src/store';
import { authCurrentDataTokenRequestAction, authCurrentDataUserRequestAction } from 'src/store/auth/actions';
import { SignInFormik } from 'src/types/auth';
import cookies from 'src/utils/cookies';
import errorHandler from 'src/utils/errorHandler';
import toastify from 'src/utils/toastify';

const SignInPage = () => {
	const dispatch = useDispatch();

	const initialValues: SignInFormik = {
		user_name: '',
		password: '',
		remember_me: false
	};

	const validationSchema = Yup.object({
		user_name: Yup.string().required('The user name is required.'),
		password: Yup.string().required('The password is required.')
	});

	const onSubmit = (values: SignInFormik, formikHelpers: FormikHelpers<SignInFormik>) => {
		const payload = {
			user_name: values.user_name,
			password: values.password
		};
		authService
			.signIn(payload)
			.then((response) => {
				cookies.set(cookiesConstant.COOKIES_KEY_TOKEN, response.data.data.token, {
					expires: values.remember_me ? config.AUTH_DATA.EXPIRED_TIME_REMEMBER_ME : config.AUTH_DATA.EXPIRED_TIME
				});
				dispatch(authCurrentDataUserRequestAction(response.data.data.user));
				dispatch(authCurrentDataTokenRequestAction(response.data.data.token));
				toastify.success('Signed in successfully.');
			})
			.catch(
				errorHandler((error) => {
					if (error.type === 'validation-error') {
						formikHelpers.setErrors(error.error.response?.data?.errors);
					}
				})
			)
			.finally(() => {
				formikHelpers.setSubmitting(false);
			});
	};

	return (
		<Card className="m-auto max-w-md sm:p-8">
			<div className="text-xl font-light text-gray-600 sm:text-2xl text-center mb-8">Sign in to your account</div>
			<Form<SignInFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(props) => (
					<Fragment>
						<div className="flex flex-col mb-4">
							<Form.Input
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
							<Form.Input
								id="password"
								type="password"
								label="Password"
								placeholder="Enter password"
								error={props.errors.password}
								touched={props.touched.password}
								autoComplete="current-password"
								{...props.getFieldProps('password')}
							/>
						</div>
						<div className="flex items-center justify-between mb-6">
							<Form.Checkbox
								id="remember_me"
								checked={props.values.remember_me}
								error={props.errors.remember_me}
								touched={props.touched.remember_me}
								{...props.getFieldProps('remember_me')}
							>
								Remember me
							</Form.Checkbox>
							<div className="text-sm">
								<Link to="/" className="font-medium text-purple-600">
									Forgot password?
								</Link>
							</div>
						</div>
						<div className="flex w-full">
							<Button className="w-full" type="submit" loading={props.isSubmitting} disabled={props.isSubmitting}>
								{props.isSubmitting ? 'Signing in' : 'Sign in'}
							</Button>
						</div>
					</Fragment>
				)}
			</Form>
			<div className="relative my-6">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-400" />
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="px-2 text-neutral-700 bg-white leading-none">Or continue with</span>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<span className="leading-none text-sm">
					Do you have an account?
					<Link className="text-purple-600 ml-1" to={`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGN_UP}`}>
						Sign up
					</Link>
				</span>
			</div>
		</Card>
	);
};

export default SignInPage;
