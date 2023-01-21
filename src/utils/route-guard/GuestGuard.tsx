import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DASHBOARD_PATH } from 'src/config';
import useAuth from 'src/hooks/useAuth';
import { GuardProps } from 'src/types';

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }: GuardProps) => {
	const { isLoggedIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate(DASHBOARD_PATH, { replace: true });
		}
	}, [isLoggedIn, navigate]);

	return children;
};

export default GuestGuard;
