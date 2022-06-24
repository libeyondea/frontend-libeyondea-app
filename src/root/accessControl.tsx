import { Navigate, useLocation } from 'react-router-dom';

import * as routeConstant from 'src/constants/route';
import * as userConstant from 'src/constants/user';
import useAppSelector from 'src/hooks/useAppSelector';
import { selectAppInitialized } from 'src/store/app/selectors';
import { selectAuthCurrent, selectIsAuth } from 'src/store/auth/selectors';

type Props = {
	children: JSX.Element;
};

const AccessControl = ({ children }: Props) => {
	const location = useLocation();
	const isAuth = useAppSelector(selectIsAuth);
	const authCurrent = useAppSelector(selectAuthCurrent);
	const appInitialized = useAppSelector(selectAppInitialized);

	if (!appInitialized) {
		return <Navigate to={`${routeConstant.ROUTE_NAME_SPLASH}`} state={{ from: location }} />;
	} else if (location.pathname.indexOf(`/${routeConstant.ROUTE_NAME_AUTH}`) > -1 && isAuth) {
		return <Navigate to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`} />;
	} else if (location.pathname.indexOf(`/${routeConstant.ROUTE_NAME_MAIN}`) > -1 && !isAuth) {
		return <Navigate to={`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGN_IN}`} />;
	} else if (
		location.pathname.indexOf(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`) > -1 &&
		authCurrent.data?.role !== userConstant.USER_ROLE_OWNER
	) {
		return <Navigate to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`} />;
	}

	return children;
};

export default AccessControl;
