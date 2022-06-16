import AuthRouter from './router';

type Props = {};

const AuthComponent: React.FC<Props> = () => {
	return (
		<div className="h-full w-full fixed overflow-x-hidden overflow-y-auto">
			<div className="min-h-full flex flex-col py-8 sm:p-16">
				<AuthRouter />
			</div>
		</div>
	);
};

export default AuthComponent;
