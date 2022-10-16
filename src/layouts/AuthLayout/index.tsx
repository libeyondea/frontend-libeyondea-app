import { Outlet } from 'react-router-dom';

import useChangeTheme from 'src/hooks/useChangeTheme';

const AuthLayout = () => {
	useChangeTheme();

	return (
		<div className="bg-base-200 h-full w-full fixed overflow-x-hidden overflow-y-auto">
			<div className="min-h-full flex flex-col py-8 sm:p-16">
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
