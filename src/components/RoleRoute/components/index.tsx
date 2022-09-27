import { Navigate } from 'react-router-dom';

import * as routeConstant from 'src/constants/route';
import useAppSelector from 'src/hooks/useAppSelector';
import { selectAuthCurrent } from 'src/store/auth/selectors';

type Props = {
	children: JSX.Element;
	roles?: string[];
};

const RoleRoute = ({ children, roles = [] }: Props) => {
	const authCurrent = useAppSelector(selectAuthCurrent);

	const canAccess = roles.includes(authCurrent.data?.role || '');

	return canAccess ? children : <Navigate to={routeConstant.ROUTE_NAME_SPLASH} />;
};

export default RoleRoute;
