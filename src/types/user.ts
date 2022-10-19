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
	page_size: number;
	sort_direction: string;
	sort_by: string;
	keyword: string;
}

export interface CreateUser {
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	password: string;
	role: string;
	actived: boolean;
	avatar?: string | null;
}

export interface CreateUserFormik {
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	password: string;
	password_confirmation: string;
	role: string;
	actived: boolean;
	avatar?: string | null;
	image: File | null;
}

export interface UpdateUser {
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	password?: string;
	role: string;
	actived: boolean;
	avatar?: string | null;
}

export interface UpdateUserFormik {
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	password?: string;
	password_confirmation: string;
	role: string;
	actived: boolean;
	avatar?: string | null;
	image: File | null;
}
