import { User } from './user';

export interface Signin {
	user_name: string;
	password: string;
}

export interface SigninFormik extends Signin {}

export interface Signup extends Signin {
	first_name: string;
	last_name: string;
	email: string;
}

export interface SignupFormik extends Signup {
	password_confirmation: string;
}

export interface Me extends User {}

export interface Token {
	token: string;
}
