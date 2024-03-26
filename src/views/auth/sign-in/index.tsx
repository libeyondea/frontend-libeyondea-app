import { FormikHelpers } from 'formik';
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
				cookies.set(cookiesConstant.COOKIES_AUTH_TOKEN, response.data.data.token, {
					expires: values.remember_me ? config.AUTH.EXPIRED_TIME_REMEMBER_ME : config.AUTH.EXPIRED_TIME
				});
				dispatch(authCurrentDataUserRequestAction(response.data.data));
				dispatch(authCurrentDataTokenRequestAction(response.data.data.token));
				toastify.success('Signed in successfully..');
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
		<Card className="sm:px-8 sm:py-4">
			<Card.Body>
				<Card.Title as="h2" className="justify-center">
					Sign in to your account
				</Card.Title>
				<Card.Content>
					<Form<SignInFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
						{(props) => (
							<div className="grid grid-cols-1 gap-4">
								<div className="col-span-1">
									<Form.Input
										label="User name"
										error={Boolean(props.errors.user_name && props.touched.user_name)}
										helperText={props.errors.user_name}
										autoComplete="username"
										{...props.getFieldProps('user_name')}
									/>
								</div>
								<div className="col-span-1">
									<Form.Input
										type="password"
										label="Password"
										error={Boolean(props.errors.password && props.touched.password)}
										helperText={props.errors.password}
										autoComplete="current-password"
										{...props.getFieldProps('password')}
									/>
								</div>
								<div className="col-span-1">
									<div className="flex items-center justify-between">
										<Form.Checkbox
											checked={props.values.remember_me}
											error={Boolean(props.errors.remember_me && props.touched.remember_me)}
											helperText={props.errors.remember_me}
											{...props.getFieldProps('remember_me')}
										>
											Remember me
										</Form.Checkbox>
										<div className="text-sm">
											<Link to="/" className="link-hover link-primary link">
												Forgot password?
											</Link>
										</div>
									</div>
								</div>
								<div className="col-span-1">
									<Button className="w-full" type="submit" loading={props.isSubmitting}>
										{props.isSubmitting ? 'Signing in' : 'Sign in'}
									</Button>
								</div>
							</div>
						)}
					</Form>
					<div className="divider my-6">Or continue with</div>
					<div className="flex items-center justify-center">
						<span className="text-sm leading-none">
							Do you have an account?
							<Link className="ml-1" to={`/${routeConstant.ROUTE_NAME_SIGN_UP}`}>
								Sign up
							</Link>
						</span>
					</div>
				</Card.Content>
			</Card.Body>
		</Card>
	);
};

export default SignInPage;
