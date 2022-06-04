import { Signup } from './auth';
import { User } from './user';

export interface Profile extends User {}

export interface UpdateProfile extends Omit<Signup, 'password'> {
	password?: string;
	avatar?: string | null;
}

export interface UpdateProfileFormik extends Omit<UpdateProfile, 'avatar'> {
	password_confirmation: string;
	image: File | null;
}
