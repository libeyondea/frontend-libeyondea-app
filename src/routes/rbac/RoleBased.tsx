import _ from 'lodash';

import DefaultPath from '../DefaultPath';
import { useSelector } from 'src/store';
import { selectAuthCurrent } from 'src/store/auth/selectors';

type Props = {
	children: JSX.Element;
	roles?: string[];
};

const RoleBased = ({ children, roles = [] }: Props) => {
	const authCurrent = useSelector(selectAuthCurrent);

	const canAccess = _.includes(roles, authCurrent.data.user?.role);

	return canAccess ? children : <DefaultPath />;
};

export default RoleBased;
