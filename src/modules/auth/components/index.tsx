import { useRoutes } from 'react-router-dom';
import AuthRouter from './router';

type Props = {};

const AuthComponent: React.FC<Props> = () => {
	return <div className="flex flex-col h-screen">{useRoutes(AuthRouter)}</div>;
};

export default AuthComponent;
