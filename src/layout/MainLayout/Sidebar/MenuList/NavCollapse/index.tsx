import { Apps as AppsIcon, ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import _ from 'lodash';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import NavItem from '../NavItem';
import useConfig from 'src/hooks/useConfig';
import { NavMenuType } from 'src/types';

interface NavCollapseProps {
	menu: NavMenuType;
	level: number;
}

const NavCollapse = ({ menu, level }: NavCollapseProps) => {
	const theme = useTheme();
	const location = useLocation();
	const { borderRadius } = useConfig();

	const [open, setOpen] = useState(false);

	const Icon = menu.icon;

	const itemIcon = Icon ? (
		<Icon
			sx={{
				width: '1.5rem',
				height: '1.5rem',
				marginTop: 'auto',
				marginBottom: 'auto'
			}}
		/>
	) : (
		<AppsIcon
			sx={{
				width: '1.5rem',
				height: '1.5rem'
			}}
			fontSize={level > 0 ? 'inherit' : 'medium'}
		/>
	);

	const menus = _.map(menu.children, (item) => {
		switch (item.type) {
			case 'collapse':
				return <NavCollapse key={item.id} menu={item} level={level + 1} />;
			case 'item':
				return <NavItem key={item.id} item={item} level={level + 1} />;
			default:
				return (
					<Typography key={item.id} variant="h6" color="error" align="center">
						Menu Items Error
					</Typography>
				);
		}
	});

	const handleClick = () => {
		setOpen(!open);
	};

	useEffect(() => {
		if (menu.children && !_.isEmpty(menu.children)) {
			_.forEach(menu.children, (item) => {
				if (!_.isEmpty(item.children)) {
					_.forEach(item.children, (item) => {
						if (item.url === location.pathname) {
							setOpen(true);
						}
					});
				}

				if (item.url === location.pathname) {
					setOpen(true);
				}
			});
		}
	}, [location.pathname, menu.children]);

	return (
		<Fragment>
			<ListItemButton
				sx={{
					borderRadius: `${borderRadius}px`,
					mb: 0.5,
					alignItems: 'flex-start',
					backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
					py: level > 1 ? 1 : 1.25,
					pl: `${level * 24}px`
				}}
				selected={open}
				onClick={handleClick}
			>
				<ListItemIcon sx={{ my: 'auto' }}>{itemIcon}</ListItemIcon>
				<ListItemText
					primary={
						<Typography variant={open ? 'h5' : 'body1'} color="inherit" sx={{ my: 'auto' }}>
							{menu.title}
						</Typography>
					}
					secondary={
						menu.caption && (
							<Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
								{menu.caption}
							</Typography>
						)
					}
				/>
				{open ? (
					<ExpandLessIcon
						sx={{
							width: '1.5rem',
							height: '1.5rem',
							marginTop: 'auto',
							marginBottom: 'auto'
						}}
					/>
				) : (
					<ExpandMoreIcon
						sx={{
							width: '1.5rem',
							height: '1.5rem',
							marginTop: 'auto',
							marginBottom: 'auto'
						}}
					/>
				)}
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				{open && (
					<List
						component="div"
						disablePadding
						sx={{
							position: 'relative',
							'&:after': {
								content: "''",
								position: 'absolute',
								left: '32px',
								top: 0,
								height: '100%',
								width: '1px',
								opacity: theme.palette.mode === 'dark' ? 0.2 : 1,
								background: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.primary.light
							}
						}}
					>
						{menus}
					</List>
				)}
			</Collapse>
		</Fragment>
	);
};

export default NavCollapse;
