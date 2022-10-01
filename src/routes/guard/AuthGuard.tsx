import { Navigate } from 'react-router-dom';

import * as routeConstant from 'src/constants/route';
import { useSelector } from 'src/store';
import { selectIsAuth } from 'src/store/auth/selectors';

export type Props = {
	children: JSX.Element;
};

const AuthGuard = ({ children }: Props) => {
	const isAuth = useSelector(selectIsAuth);

	if (!isAuth) {
		return <Navigate to={routeConstant.ROUTE_NAME_AUTH_SIGN_IN} replace />;
	}

	return children;
};

export default AuthGuard;
