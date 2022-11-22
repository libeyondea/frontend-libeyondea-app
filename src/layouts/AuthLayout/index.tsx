import { Outlet } from 'react-router-dom';

import useTheme from 'src/hooks/useTheme';

const AuthLayout = () => {
	useTheme();

	return (
		<div className="center-screen">
			<div className="center-screen-content">
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
