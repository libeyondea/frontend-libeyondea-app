import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { DASHBOARD_PATH } from 'src/config';
import Logo from 'src/ui-component/Logo';

const LogoSection = () => (
	<Link component={RouterLink} to={DASHBOARD_PATH}>
		<Logo />
	</Link>
);

export default LogoSection;
