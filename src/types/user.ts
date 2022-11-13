export interface User {
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

export interface ParamUser {
	page: number;
	page_size: number;
	sort_by: string;
	sort_direction: string;
	search: string;
}

export interface CreateUpdateUser {
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	password?: string;
	role: string;
	status: boolean;
	avatar?: string;
}
export interface CreateUpdateUserFormik {
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	password: string;
	password_confirmation: string;
	role: string;
	status: boolean;
	avatar: string;
	image: File | null;
}
