import { Signup } from './auth';

export interface User {
	id: number;
	first_name: string;
	last_name: string;
	user_name: string;
	avatar_url: string;
	email: string;
	email_verified_at: string | null;
	role: string;
	status: string;
	created_at: string | null;
	updated_at: string | null;
}

export interface CreateUser extends Signup {
	avatar?: string | null;
	role: string;
	status: string;
}

export interface CreateUserFormik extends Omit<CreateUser, 'avatar'> {
	password_confirmation: string;
	image: File | null;
}

export interface UpdateUser extends Omit<CreateUser, 'password'> {
	password?: string;
}

export interface UpdateUserFormik extends Omit<CreateUserFormik, 'password'> {
	password?: string;
}
