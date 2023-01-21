import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { createContext, useEffect, useReducer } from 'react';

import { FIREBASE_API } from 'src/config';
import accountReducer from 'src/store/accountReducer';
import { LOGIN, LOGOUT } from 'src/store/actions';
import { FirebaseContextType, InitialLoginContextProps } from 'src/types/auth';
import Loader from 'src/ui-component/Loader';

if (!firebase.apps.length) {
	firebase.initializeApp(FIREBASE_API);
}

const initialState: InitialLoginContextProps = {
	isLoggedIn: false,
	isInitialized: false,
	user: null
};

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider = ({ children }: { children: React.ReactElement }) => {
	const [state, dispatch] = useReducer(accountReducer, initialState);

	useEffect(
		() =>
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					dispatch({
						type: LOGIN,
						payload: {
							isLoggedIn: true,
							user: {
								id: user.uid,
								email: user.email!,
								name: user.displayName || 'John Doe'
							}
						}
					});
				} else {
					dispatch({
						type: LOGOUT
					});
				}
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[dispatch]
	);

	const firebaseEmailPasswordSignIn = (email: string, password: string) => firebase.auth().signInWithEmailAndPassword(email, password);

	const firebaseGoogleSignIn = () => {
		const provider = new firebase.auth.GoogleAuthProvider();

		return firebase.auth().signInWithPopup(provider);
	};

	const firebaseRegister = async (email: string, password: string) => firebase.auth().createUserWithEmailAndPassword(email, password);

	const logout = () => firebase.auth().signOut();

	const resetPassword = async (email: string) => {
		await firebase.auth().sendPasswordResetEmail(email);
	};

	const updateProfile = () => {};
	if (state.isInitialized !== undefined && !state.isInitialized) {
		return <Loader />;
	}

	return (
		<FirebaseContext.Provider
			value={{
				...state,
				firebaseRegister,
				firebaseEmailPasswordSignIn,
				login: () => {},
				firebaseGoogleSignIn,
				logout,
				resetPassword,
				updateProfile
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
};

export default FirebaseContext;
