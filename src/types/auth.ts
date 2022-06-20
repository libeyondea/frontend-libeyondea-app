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
	first_name: string;
	last_name: string;
	user_name: string;
	avatar_url: string;
	email: string;
	role: string;
	actived: boolean;
	created_at: string | null;
	updated_at: string | null;
	setting: {
		id: number;
		fixed_navbar: boolean;
		fixed_footer: boolean;
		created_at: string | null;
		updated_at: string | null;
	};
}

export interface Token {
	token: string;
}
