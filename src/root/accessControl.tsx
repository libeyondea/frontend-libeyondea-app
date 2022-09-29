import _ from 'lodash';
import { Navigate, useLocation } from 'react-router-dom';

import ImageComponent from 'src/components/Image/components';
import config from 'src/config';
import * as cookiesConstant from 'src/constants/cookies';
import * as routeConstant from 'src/constants/route';
import cookies from 'src/helpers/cookies';
import errorHandler from 'src/helpers/errorHandler';
import useAppDispatch from 'src/hooks/useAppDispatch';
import useAppSelector from 'src/hooks/useAppSelector';
import useOnceEffect from 'src/hooks/useOnceEffect';
import Logo from 'src/images/logo.png';
import authService from 'src/services/auth';
import { appInitializedRequestAction } from 'src/store/app/actions';
import { selectAppInitialized } from 'src/store/app/selectors';
import { authCurrentDataTokenRequestAction, authCurrentDataUserRequestAction } from 'src/store/auth/actions';
import { selectIsAuth } from 'src/store/auth/selectors';

type Props = {
	children: JSX.Element;
};

const AccessControl = ({ children }: Props) => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);
	const appInitialized = useAppSelector(selectAppInitialized);

	useOnceEffect(() => {
		const token = cookies.get(cookiesConstant.COOKIES_KEY_TOKEN);

		if (token) {
			authService
				.me(token)
				.then((response) => {
					dispatch(authCurrentDataUserRequestAction(response.data.data));
					dispatch(authCurrentDataTokenRequestAction(token));
					dispatch(appInitializedRequestAction(true));
				})
				.catch(
					errorHandler((error) => {
						if (error.type === 'unauthorized-error') {
							dispatch(authCurrentDataUserRequestAction(null));
							dispatch(authCurrentDataTokenRequestAction(null));
						}
						dispatch(appInitializedRequestAction(true));
					})
				);
		} else {
			dispatch(authCurrentDataUserRequestAction(null));
			dispatch(authCurrentDataTokenRequestAction(null));
			dispatch(appInitializedRequestAction(true));
		}
	});

	if (!appInitialized) {
		return (
			<div className="flex h-screen">
				<ImageComponent className="m-auto animate-spin rounded-full h-32 w-32" src={Logo} alt={config.APP_NAME} />
			</div>
		);
	} else if (_.includes(location.pathname, `/${routeConstant.ROUTE_NAME_AUTH}`) && isAuth) {
		return <Navigate to={`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`} replace />;
	} else if (_.includes(location.pathname, `/${routeConstant.ROUTE_NAME_MAIN}`) && !isAuth) {
		return <Navigate to={`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGN_IN}`} replace />;
	}

	return children;
};

export default AccessControl;
