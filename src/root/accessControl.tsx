import { selectAuthCurrent, selectIsAuth } from 'store/auth/selectors';
import { selectAppInitialized } from 'store/app/selectors';
import * as routeConstant from 'constants/route';
import * as userConstant from 'constants/user';
import useAppSelector from 'hooks/useAppSelector';
import { useLocation, Navigate } from 'react-router-dom';

type Props = {
	children: JSX.Element;
};

const AccessControl: React.FC<Props> = ({ children }) => {
	const location = useLocation();
	const isAuth = useAppSelector(selectIsAuth);
	const authCurrent = useAppSelector(selectAuthCurrent);
	const appInitialized = useAppSelector(selectAppInitialized);
	console.log('AccessControl');

	if (!appInitialized) {
		return <Navigate to={`${routeConstant.ROUTE_NAME_SPLASH}`} state={{ from: location }} />;
	} else if (location.pathname.indexOf(`/${routeConstant.ROUTE_NAME_AUTH}`) > -1 && isAuth) {
		return <Navigate to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`} />;
	} else if (location.pathname.indexOf(`/${routeConstant.ROUTE_NAME_MAIN}`) > -1 && !isAuth) {
		return (
			<Navigate
				to={`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGNIN}`}
				state={{ from: location }}
			/>
		);
	} else if (
		location.pathname.indexOf(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_USER}`) > -1 &&
		authCurrent.user?.role !== userConstant.USER_ROLE_OWNER
	) {
		return <Navigate to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`} />;
	}
	return children;
};

export default AccessControl;
