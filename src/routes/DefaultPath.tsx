import { Navigate } from 'react-router-dom';

import * as routeConstant from 'src/constants/route';

const DefaultPath = () => {
	return <Navigate to={`${routeConstant.ROUTE_NAME_DASHBOARD}`} replace />;
};

export default DefaultPath;
