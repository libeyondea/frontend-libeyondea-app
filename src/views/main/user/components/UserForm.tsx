import { FormikHelpers } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

import Button from 'src/components/Button';
import Card from 'src/components/Card';
import Empty from 'src/components/Empty';
import Form from 'src/components/Form';
import { SpinLoading } from 'src/components/Loading';
import * as userConstant from 'src/constants/user';
import { DataReducer } from 'src/types/reducer';
import { CreateUpdateUserFormik, User } from 'src/types/user';

type Props = {
	initialData?: DataReducer<User>;
	onSubmit: (values: CreateUpdateUserFormik, formikHelpers: FormikHelpers<CreateUpdateUserFormik>) => void | Promise<any>;
	submitting?: boolean;
	isEdit?: boolean;
};

const UserForm = ({ initialData, onSubmit, submitting = false, isEdit = false }: Props) => {
	const initialValues: CreateUpdateUserFormik = {
		first_name: (isEdit && initialData?.data.first_name) || '',
		last_name: (isEdit && initialData?.data.last_name) || '',
		email: (isEdit && initialData?.data.email) || '',
		user_name: (isEdit && initialData?.data.user_name) || '',
		password: '',
		password_confirmation: '',
		role: (isEdit && initialData?.data.role) || userConstant.USER_ROLE_MEMBER,
		status: (isEdit && initialData?.data.status) || false,
		avatar: '',
		image: null
	};

	const validationSchema = Yup.object({
		first_name: Yup.string().required('The first name is required.').max(20, 'The first name must not be greater than 20 characters.'),
		last_name: Yup.string().required('The last name is required.').max(20, 'The last name must not be greater than 20 characters.'),
		email: Yup.string().required('Email is required.'),
		user_name: Yup.string()
			.required('The user name is required.')
			.min(3, 'The user name must be at least 3 characters.')
			.max(20, 'The user name must not be greater than 20 characters.'),
		password: Yup.string().min(6, 'The password must be at least 6 characters.').max(66, 'The password must not be greater than 66 characters.'),
		password_confirmation: Yup.string().test('passwords-match', 'The password confirmation does not match.', function (value) {
			return this.parent.password === value;
		}),
		role: Yup.string()
			.required('The role is required.')
			.oneOf([...userConstant.USER_ROLE_ALL], 'The role invalid.'),
		status: Yup.boolean()
	});

	return (
		<Card>
			<Card.Body>
				<Card.Title>{isEdit ? 'Edit User' : 'New User'}</Card.Title>
				<Card.Content>
					{isEdit && initialData?.loading ? (
						<SpinLoading />
					) : isEdit && _.isEmpty(initialData?.data) ? (
						<Empty />
					) : (
						<Form<CreateUpdateUserFormik> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
							{(props) => (
								<div className="grid grid-cols-12 gap-4">
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Input
											label="First name"
											error={Boolean(props.errors.first_name && props.touched.first_name)}
											helperText={props.errors.first_name}
											{...props.getFieldProps('first_name')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Input
											label="Last name"
											error={Boolean(props.errors.last_name && props.touched.last_name)}
											helperText={props.errors.last_name}
											{...props.getFieldProps('last_name')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Input
											label="User name"
											error={Boolean(props.errors.user_name && props.touched.user_name)}
											helperText={props.errors.user_name}
											autoComplete="username"
											{...props.getFieldProps('user_name')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Input
											label="Email"
											error={Boolean(props.errors.email && props.touched.email)}
											helperText={props.errors.email}
											{...props.getFieldProps('email')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Input
											type="password"
											label="Password"
											error={Boolean(props.errors.password && props.touched.password)}
											helperText={props.errors.password}
											autoComplete="new-password"
											{...props.getFieldProps('password')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Input
											type="password"
											label="Password confirmation"
											error={Boolean(props.errors.password_confirmation && props.touched.password_confirmation)}
											helperText={props.errors.password_confirmation}
											autoComplete="new-password"
											{...props.getFieldProps('password_confirmation')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Select
											label="Role"
											options={[...userConstant.USER_ROLE_ALL]}
											error={Boolean(props.errors.role && props.touched.role)}
											helperText={props.errors.role}
											{...props.getFieldProps('role')}
										/>
									</div>
									<div className="col-span-12 md:col-span-6 lg:col-span-4">
										<Form.Toggle
											label="Status"
											checked={props.values.status}
											error={Boolean(props.errors.status && props.touched.status)}
											helperText={props.errors.status}
											{...props.getFieldProps('status')}
										/>
									</div>
									<div className="col-span-12">
										<Form.Image
											label="Avatar"
											imageUrl={isEdit ? initialData?.data.avatar : ''}
											error={Boolean(props.errors.image && props.touched.image)}
											helperText={props.errors.image}
											onChangeImage={props.setFieldValue}
											onBlurImage={props.setFieldTouched}
											canDelete={!isEdit}
											{...props.getFieldProps('image')}
										/>
									</div>
									<div className="col-span-12 flex flex-row-reverse">
										<Button type="submit" loading={submitting}>
											{isEdit ? (submitting ? 'Updating' : 'Update') : submitting ? 'Creating' : 'Create'}
										</Button>
									</div>
								</div>
							)}
						</Form>
					)}
				</Card.Content>
			</Card.Body>
		</Card>
	);
};

export default UserForm;
