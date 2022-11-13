export interface Profile {
	id: number;
	first_name: string;
	last_name: string;
	user_name: string;
	avatar: string;
	email: string;
	role: string;
	status: boolean;
	created_at: string | null;
	updated_at: string | null;
}

export interface UpdateProfile {
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	password?: string;
	avatar?: string;
}

export interface UpdateProfileFormik {
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	password: string;
	password_confirmation: string;
	avatar: string;
	image: File | null;
}
