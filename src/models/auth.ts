import { User } from './user';

export interface Signin {
	user_name: string;
	password: string;
	remember_me: boolean;
}

export interface SigninFormik extends Signin {}

export interface Signup {
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	password: string;
}

export interface SignupFormik extends Signup {
	password_confirmation: string;
	terms: boolean;
}

export interface Me extends User {}

export interface Token {
	token: string;
}
