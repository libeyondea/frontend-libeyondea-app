import { useRoutes } from 'react-router-dom';
import UserRouter from './router';

type Props = {};

const UserComponent: React.FC<Props> = () => {
	return <>{useRoutes(UserRouter)}</>;
};

export default UserComponent;
