export interface SignIn {
	user_name: string;
	password: string;
}

export interface SignInFormik extends SignIn {
	remember_me: boolean;
}

export interface SignUp {
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	password: string;
}

export interface SignUpFormik extends SignUp {
	password_confirmation: string;
	terms: boolean;
}

export interface Me {
	id: number;
	avatar: string;
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	role: {
		id: string;
		name: string;
		code: string;
		created_at: string | null;
		updated_at: string | null;
	};
	token: string;
	last_sign_in: string;
	status: boolean;
	created_at: string | null;
	updated_at: string | null;
	setting: {
		id: number;
		theme: string;
		created_at: string | null;
		updated_at: string | null;
	};
}

export interface MeToken {
	user: Me;
	token: string;
}
