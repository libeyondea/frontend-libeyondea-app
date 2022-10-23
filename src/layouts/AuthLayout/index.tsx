import { Outlet } from 'react-router-dom';

import useChangeTheme from 'src/hooks/useChangeTheme';

const AuthLayout = () => {
	useChangeTheme();

	return (
		<div className="center-screen">
			<div className="center-screen-content">
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
