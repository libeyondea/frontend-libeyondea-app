import { Box, Drawer, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { memo, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import LogoSection from '../LogoSection';
import MenuList from './MenuList';
import { useDispatch, useSelector } from 'src/store';
import { drawerWidth } from 'src/store/constant';
import { openDrawer } from 'src/store/slices/menu';
import Chip from 'src/ui-component/extended/Chip';

const Sidebar = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

	const { drawerOpen } = useSelector((state) => state.menu);

	const logo = useMemo(
		() => (
			<Box sx={{ display: { xs: 'block', md: 'none' } }}>
				<Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
					<LogoSection />
				</Box>
			</Box>
		),
		[]
	);

	const drawer = useMemo(
		() => (
			<PerfectScrollbar
				component="div"
				style={{
					height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
					paddingLeft: '16px',
					paddingRight: '16px'
				}}
			>
				<MenuList />
				<Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
					<Chip label={process.env.REACT_APP_VERSION} disabled chipcolor="secondary" size="small" sx={{ cursor: 'pointer' }} />
				</Stack>
			</PerfectScrollbar>
		),
		[matchUpMd]
	);

	return (
		<Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}>
			<Drawer
				variant={matchUpMd ? 'persistent' : 'temporary'}
				anchor="left"
				open={drawerOpen}
				onClose={() => dispatch(openDrawer(!drawerOpen))}
				sx={{
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						background: theme.palette.background.default,
						color: theme.palette.text.primary,
						borderRight: 'none',
						[theme.breakpoints.up('md')]: {
							top: '88px'
						}
					}
				}}
				ModalProps={{ keepMounted: true }}
				color="inherit"
			>
				{drawerOpen && logo}
				{drawerOpen && drawer}
			</Drawer>
		</Box>
	);
};

export default memo(Sidebar);
