import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Button from 'src/components/Button';
import Card from 'src/components/Card';
import Form from 'src/components/Form';
import Link from 'src/components/Link';
import * as routeConstant from 'src/constants/route';
import authService from 'src/services/authService';
import { SignUpFormik } from 'src/types/auth';
import errorHandler from 'src/utils/errorHandler';
import toastify from 'src/utils/toastify';

const SignUpPage = () => {
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
			.then(() => {
				toastify.success('Signed up successfully.');
				navigate(`/${routeConstant.ROUTE_NAME_SIGN_IN}`);
			})
			.catch(
				errorHandler((error) => {
					if (error.type === 'validation-error') {
						formikHelpers.setErrors(error.error.response?.data.errors);
					}
				})
			)
			.finally(() => {
				formikHelpers.setSubmitting(false);
			});
	};

	return (
		<Card className="sm:py-4 sm:px-8">
			<Card.Body>
				<Card.Title as="h2" className="justify-center">
					Sign up your account
				</Card.Title>
				<Card.Content>
					<Form<SignUpFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
						{(props) => (
							<div className="grid grid-cols-1 gap-4">
								<div className="col-span-1">
									<Form.Input
										label="First name"
										error={Boolean(props.errors.first_name && props.touched.first_name)}
										helperText={props.errors.first_name}
										{...props.getFieldProps('first_name')}
									/>
								</div>
								<div className="col-span-1">
									<Form.Input
										label="Last name"
										error={Boolean(props.errors.last_name && props.touched.last_name)}
										helperText={props.errors.last_name}
										{...props.getFieldProps('last_name')}
									/>
								</div>
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
										label="Email"
										error={Boolean(props.errors.email && props.touched.email)}
										helperText={props.errors.email}
										{...props.getFieldProps('email')}
									/>
								</div>
								<div className="col-span-1">
									<Form.Input
										type="password"
										label="Password"
										error={Boolean(props.errors.password && props.touched.password)}
										helperText={props.errors.password}
										autoComplete="new-password"
										{...props.getFieldProps('password')}
									/>
								</div>
								<div className="col-span-1">
									<Form.Input
										type="password"
										label="Password confirmation"
										error={Boolean(props.errors.password_confirmation && props.touched.password_confirmation)}
										helperText={props.errors.password_confirmation}
										autoComplete="new-password"
										{...props.getFieldProps('password_confirmation')}
									/>
								</div>
								<div className="col-span-1">
									<Form.Checkbox
										checked={props.values.terms}
										error={Boolean(props.errors.terms && props.touched.terms)}
										helperText={props.errors.terms}
										{...props.getFieldProps('terms')}
									>
										By signing up, you agree to our{' '}
										<Link className="link link-primary link-hover font-medium" to="/">
											Terms
										</Link>
										.
									</Form.Checkbox>
								</div>
								<div className="col-span-1">
									<Button className="w-full" type="submit" loading={props.isSubmitting}>
										{props.isSubmitting ? 'Signing up' : 'Sign up'}
									</Button>
								</div>
							</div>
						)}
					</Form>
					<div className="divider my-6">Or continue with</div>
					<div className="flex items-center justify-center">
						<span className="leading-none text-sm">
							Do you have an account?
							<Link className="link link-primary link-hover ml-1" to={`/${routeConstant.ROUTE_NAME_SIGN_IN}`}>
								Sign in
							</Link>
						</span>
					</div>
				</Card.Content>
			</Card.Body>
		</Card>
	);
};

export default SignUpPage;
