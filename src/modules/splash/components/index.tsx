import { getCookie } from 'helpers/cookies';
import { appInitializedRequestAction } from 'store/app/actions';
import { authCurrentRequestAction } from 'store/auth/actions';
import ImageComponent from 'components/Image/components';
import config from 'config';
import { selectIsAuth } from 'store/auth/selectors';
import * as cookiesConstant from 'constants/cookies';
import * as routeConstant from 'constants/route';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { useNavigate, useLocation, Location } from 'react-router-dom';
import useDidMountEffect from 'hooks/useDidMountEffect';
import { signout } from 'helpers/auth';
import authService from 'services/authService';

type Props = {};

const SplashComponent: React.FC<Props> = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = (location.state as { from: Location })?.from;
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuth);
	console.log('SplashComponent');

	useDidMountEffect(() => {
		dispatch(appInitializedRequestAction(true));
		const token = getCookie(cookiesConstant.COOKIES_KEY_TOKEN);
		const initialUrl = from?.pathname;

		if (isAuth) {
			if (initialUrl) {
				navigate(initialUrl, { replace: true });
			} else {
				navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`, { replace: true });
			}
		} else if (token) {
			authService
				.me(token)
				.then((response) => {
					dispatch(authCurrentRequestAction(response.data.data, token));
					if (initialUrl) {
						navigate(initialUrl, { replace: true });
					} else {
						navigate(`/${routeConstant.ROUTE_NAME_MAIN}/${routeConstant.ROUTE_NAME_MAIN_DASHBOARD}`, {
							replace: true
						});
					}
				})
				.catch((error) => {
					signout(navigate);
				});
		} else {
			dispatch(authCurrentRequestAction(null, null));
			if (initialUrl) {
				navigate(initialUrl, { replace: true });
			} else {
				navigate(`/${routeConstant.ROUTE_NAME_AUTH}/${routeConstant.ROUTE_NAME_AUTH_SIGNIN}`, { replace: true });
			}
		}
	});

	return (
		<div className="flex h-screen">
			<ImageComponent className="m-auto animate-spin rounded-full h-32 w-32" src={config.LOGO_URL} alt="Loading..." />
		</div>
	);
};

export default SplashComponent;
