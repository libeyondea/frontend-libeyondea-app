import { Apps } from '@mui/icons-material';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';

import useConfig from 'src/hooks/useConfig';
import { useDispatch } from 'src/store';
import { openDrawer } from 'src/store/slices/menu';
import { NavMenuType } from 'src/types';

interface NavItemProps {
	item: NavMenuType;
	level: number;
}

const NavItem = ({ item, level }: NavItemProps) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const location = useLocation();
	const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

	const { borderRadius } = useConfig();

	const Icon = item.icon;

	const itemIcon = Icon ? (
		<Icon
			sx={{
				width: '1.5rem',
				height: '1.5rem'
			}}
		/>
	) : (
		<Apps
			sx={{
				width: '1.5rem',
				height: '1.5rem'
			}}
			fontSize={level > 0 ? 'inherit' : 'medium'}
		/>
	);

	return (
		<ListItemButton
			component={Link}
			to={item.url || '/'}
			disabled={item.disabled}
			sx={{
				borderRadius: `${borderRadius}px`,
				mb: 0.5,
				alignItems: 'flex-start',
				backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
				py: level > 1 ? 1 : 1.25,
				pl: `${level * 24}px`
			}}
			selected={location.pathname === item.url}
			onClick={() => matchesSM && dispatch(openDrawer(false))}
		>
			<ListItemIcon sx={{ my: 'auto' }}>{itemIcon}</ListItemIcon>
			<ListItemText
				primary={
					<Typography variant={location.pathname === item.url ? 'h5' : 'body1'} color="inherit">
						{item.title}
					</Typography>
				}
				secondary={
					item.caption && (
						<Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
							{item.caption}
						</Typography>
					)
				}
			/>
			{item.chip && (
				<Chip
					color={item.chip.color}
					variant={item.chip.variant}
					size={item.chip.size}
					label={item.chip.label}
					avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
				/>
			)}
		</ListItemButton>
	);
};

export default NavItem;
