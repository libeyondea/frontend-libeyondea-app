import { Avatar, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconMenu2 } from '@tabler/icons';
import { Fragment } from 'react';

import LogoSection from '../LogoSection';
import LocalizationSection from './LocalizationSection';
import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';
import { useDispatch, useSelector } from 'src/store';
import { openDrawer } from 'src/store/slices/menu';

const Header = () => {
	const theme = useTheme();
	const dispatch = useDispatch();

	const { drawerOpen } = useSelector((state) => state.menu);

	return (
		<Fragment>
			<Box
				sx={{
					width: 228,
					display: 'flex',
					[theme.breakpoints.down('md')]: {
						width: 'auto'
					}
				}}
			>
				<Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
					<LogoSection />
				</Box>
				<Avatar
					variant="rounded"
					sx={{
						...theme.typography.commonAvatar,
						...theme.typography.mediumAvatar,
						overflow: 'hidden',
						transition: 'all .2s ease-in-out',
						background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
						color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
						'&:hover': {
							background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
							color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
						}
					}}
					onClick={() => dispatch(openDrawer(!drawerOpen))}
					color="inherit"
				>
					<IconMenu2 stroke={1.5} size="1.3rem" />
				</Avatar>
			</Box>

			<Box sx={{ flexGrow: 1 }} />
			<Box sx={{ flexGrow: 1 }} />

			{/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}> */}
			<LocalizationSection />
			{/* </Box> */}

			<NotificationSection />
			<ProfileSection />

			{/* <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
				<MobileSection />
			</Box> */}
		</Fragment>
	);
};

export default Header;
