import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from 'src/hooks/useAuth';
import { GuardProps } from 'src/types';

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }: GuardProps) => {
	const { isLoggedIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('login', { replace: true });
		}
	}, [isLoggedIn, navigate]);

	return children;
};

export default AuthGuard;
