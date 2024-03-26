import _ from 'lodash';
import { Navigate } from 'react-router-dom';

import MainRoutes from './MainRoutes';
import { useSelector } from 'src/store';
import { selectAuthCurrent } from 'src/store/auth/selectors';

const DefaultPath = () => {
	const authCurrent = useSelector(selectAuthCurrent);

	const mainRoutesChildrenWithRole = _.filter(MainRoutes.children, (c) => _.includes(c.roles, authCurrent.data.user?.role.name));

	const path = _.nth(mainRoutesChildrenWithRole, 1)?.path || '/';

	return <Navigate to={path} replace />;
};

export default DefaultPath;
