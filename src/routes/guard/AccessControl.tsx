import { useEffectOnce } from 'react-use';

import Logo from 'src/assets/images/logo.png';
import Image from 'src/components/Image';
import config from 'src/config';
import * as cookiesConstant from 'src/constants/cookies';
import authService from 'src/services/authService';
import { useDispatch, useSelector } from 'src/store';
import { appInitializedRequestAction } from 'src/store/app/actions';
import { selectAppInitialized } from 'src/store/app/selectors';
import { authCurrentDataTokenRequestAction, authCurrentDataUserRequestAction } from 'src/store/auth/actions';
import cookies from 'src/utils/cookies';
import errorHandler from 'src/utils/errorHandler';

type Props = {
	children: JSX.Element;
};

const AccessControl = ({ children }: Props) => {
	const dispatch = useDispatch();
	const appInitialized = useSelector(selectAppInitialized);

	useEffectOnce(() => {
		const token = cookies.get(cookiesConstant.COOKIES_AUTH_TOKEN);

		if (token) {
			authService
				.me(token)
				.then((response) => {
					dispatch(authCurrentDataUserRequestAction(response.data.data));
					dispatch(authCurrentDataTokenRequestAction(token));
					dispatch(appInitializedRequestAction(true));
				})
				.catch(
					errorHandler(() => {
						cookies.remove(cookiesConstant.COOKIES_AUTH_TOKEN);
						dispatch(authCurrentDataUserRequestAction(null));
						dispatch(authCurrentDataTokenRequestAction(null));
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
				<Image className="m-auto animate-spin rounded-full h-32 w-32" src={Logo} alt={config.APP_NAME} />
			</div>
		);
	}

	return children;
};

export default AccessControl;
