import { useRoutes } from 'react-router-dom';
import AuthRouter from './router';

type Props = {};

const AuthComponent: React.FC<Props> = () => {
	return (
		<div className="h-full w-full fixed overflow-x-hidden overflow-y-auto">
			<div className="min-h-full flex p-16">{useRoutes(AuthRouter)}</div>
		</div>
	);
};

export default AuthComponent;
