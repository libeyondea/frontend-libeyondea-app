import { FormikHelpers } from 'formik';
import { Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import ButtonComponent from 'components/Button/components';
import CardComponent from 'components/Card/components';
import FormComponent from 'components/Form/components';
import LinkComponent from 'components/Link/components';
import config from 'config';
import * as cookiesConstant from 'constants/cookies';
import * as routeConstant from 'constants/route';
import { setCookie } from 'helpers/cookies';
import { errorHandler } from 'helpers/error';
import toastify from 'helpers/toastify';
import authService from 'services/authService';
import { SignInFormik } from 'types/auth';
import { LocationState } from 'types/router';

type Props = {};

const SignInCompoment: React.FC<Props> = () => {
	const navigate = useNavigate();
	const location = useLocation() as LocationState;

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
			password: values.password,
			remember_me: values.remember_me
		};
		authService
			.signIn(payload)
			.then((response) => {
				setCookie(cookiesConstant.COOKIES_KEY_TOKEN, response.data.data.token, {
					expires: config.AUTH_DATA.EXPIRED_TIME
				});
				toastify.success('Signed in successfully');
				navigate(`${routeConstant.ROUTE_NAME_SPLASH}`, {
					state: {
						from: location?.state?.from
					}
				});
			})
			.catch(errorHandler(undefined, (validationError) => formikHelpers.setErrors(validationError.data.errors)))
			.finally(() => {
				formikHelpers.setSubmitting(false);
			});
	};

	return (
		<CardComponent className="m-auto flex flex-col w-full max-w-md sm:p-8">
			<div className="text-xl font-light text-gray-600 sm:text-2xl text-center mb-8">Sign in to your account</div>
			<FormComponent<SignInFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
				{(props) => (
					<Fragment>
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
							<FormComponent.Checkbox
								id="remember_me"
								checked={props.values.remember_me}
								error={props.errors.remember_me}
								touched={props.touched.remember_me}
								{...props.getFieldProps('remember_me')}
							>
								Remember me
							</FormComponent.Checkbox>
							<div className="text-sm">
								<LinkComponent href="/" className="font-medium text-purple-600">
									Forgot password?
								</LinkComponent>
							</div>
						</div>
						<div className="flex w-full">
							<ButtonComponent className="w-full" type="submit" loading={props.isSubmitting} disabled={props.isSubmitting}>
								{props.isSubmitting ? 'Signing in' : 'Sign in'}
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
					<span className="px-2 text-neutral-700 bg-white leading-none">Or continue with</span>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<span className="leading-none text-sm">
					Do you have an account?
					<LinkComponent className="text-purple-600 ml-1" href={`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGN_UP}`}>
						Sign up
					</LinkComponent>
				</span>
			</div>
		</CardComponent>
	);
};

export default SignInCompoment;
