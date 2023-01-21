import firebase from 'firebase/compat/app';

import { UserProfile } from 'src/types/user-profile';

export type FirebaseContextType = {
	isLoggedIn: boolean;
	isInitialized?: boolean;
	user?: UserProfile | null | undefined;
	logout: () => Promise<void>;
	login: () => void;
	firebaseRegister: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
	firebaseEmailPasswordSignIn: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
	firebaseGoogleSignIn: () => Promise<firebase.auth.UserCredential>;
	resetPassword: (email: string) => Promise<void>;
	updateProfile: VoidFunction;
};

export interface InitialLoginContextProps {
	isLoggedIn: boolean;
	isInitialized?: boolean;
	user?: UserProfile | null | undefined;
}
