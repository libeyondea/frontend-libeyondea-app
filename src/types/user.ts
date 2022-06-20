export interface User {
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
}

export interface ListUser {
	page: number;
	limit: number;
	sort_direction: string;
	sort_by: string;
	q: string;
}

export interface CreateUser {
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	password: string;
	avatar?: string | null;
	role: string;
	actived: boolean;
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
