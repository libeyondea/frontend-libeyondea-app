import { Navigate } from 'react-router-dom';

import * as routeConstant from 'src/constants/route';
import { useSelector } from 'src/store';
import { selectIsAuth } from 'src/store/auth/selectors';

export type Props = {
	children: JSX.Element;
};

const GuestGuard = ({ children }: Props) => {
	const isAuth = useSelector(selectIsAuth);

	if (isAuth) {
		return <Navigate to={routeConstant.ROUTE_NAME_MAIN_DASHBOARD} replace />;
	}

	return children;
};

export default GuestGuard;
