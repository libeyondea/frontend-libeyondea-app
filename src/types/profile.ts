export interface Profile {
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

export interface UpdateProfile {
	first_name: string;
	last_name: string;
	user_name: string;
	email: string;
	password?: string;
	avatar?: string | null;
}

export interface UpdateProfileFormik extends Omit<UpdateProfile, 'avatar'> {
	password_confirmation: string;
	image: File | null;
}
