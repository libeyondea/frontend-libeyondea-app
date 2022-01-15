import { removeCookie } from 'helpers/cookies';
import * as cookiesConstant from 'constants/cookies';
import * as routeConstant from 'constants/route';
import { NavigateFunction } from 'react-router-dom';
import authService from 'services/authService';
import store from 'store';
import { authCurrentRequestAction } from 'store/auth/actions';

export const signout = (navigate?: NavigateFunction) => {
	const token = store.getState().authState.current.token;
	if (token) {
		authService
			.signout(token)
			.then(() => {})
			.catch(() => {})
			.finally(() => {});
	}
	removeCookie(cookiesConstant.COOKIES_KEY_TOKEN);
	store.dispatch(authCurrentRequestAction(null, null));
	navigate && navigate(`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGNIN}`);
};
