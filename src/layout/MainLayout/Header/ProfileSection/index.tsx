import {
	Avatar,
	Box,
	Card,
	CardContent,
	Chip,
	ClickAwayListener,
	Divider,
	Grid,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Popper,
	Stack,
	Switch,
	Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconLogout, IconSettings, IconUser } from '@tabler/icons';
import _ from 'lodash';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useLocation, useNavigate } from 'react-router-dom';

import User1 from 'src/assets/images/users/user-round.svg';
import useAuth from 'src/hooks/useAuth';
import useConfig from 'src/hooks/useConfig';
import MainCard from 'src/ui-component/cards/MainCard';
import Transitions from 'src/ui-component/extended/Transitions';

const ProfileSection = () => {
	const theme = useTheme();
	const { borderRadius } = useConfig();
	const navigate = useNavigate();
	const location = useLocation();

	const [sdm, setSdm] = useState(true);
	const [notification, setNotification] = useState(false);
	const { logout, user } = useAuth();
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

	const handleLogout = async () => {
		try {
			await logout();
		} catch (err) {
			console.error(err);
		}
	};

	const handleListItemClick = (route: string) => {
		handleClose();
		navigate(route);
	};

	const handleToggle = (event: React.MouseEvent<HTMLDivElement>) => {
		setOpen((prevOpen) => !prevOpen);
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(false);
		setAnchorEl(null);
	};

	return (
		<>
			<Chip
				sx={{
					height: '48px',
					alignItems: 'center',
					borderRadius: '27px',
					transition: 'all .2s ease-in-out',
					borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
					backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
					'&:hover': {
						borderColor: theme.palette.primary.main,
						background: `${theme.palette.primary.main}!important`,
						color: theme.palette.primary.light,
						'& svg': {
							stroke: theme.palette.primary.light
						}
					},
					'& .MuiChip-label': {
						lineHeight: 0,
						padding: 0
					}
				}}
				label={
					<Avatar
						src={User1}
						sx={{
							...theme.typography.mediumAvatar,
							margin: '8px 8px 8px 8px !important',
							cursor: 'pointer'
						}}
						color="inherit"
					/>
				}
				variant="outlined"
				onClick={handleToggle}
				color="primary"
			/>
			<Popper
				placement="bottom-end"
				open={open}
				anchorEl={anchorEl}
				role={undefined}
				transition
				disablePortal
				popperOptions={{
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: [0, 12]
							}
						}
					]
				}}
			>
				{({ TransitionProps }) => (
					<ClickAwayListener onClickAway={handleClose}>
						<Transitions in={open} {...TransitionProps}>
							<Paper>
								{open && (
									<MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
										<Box sx={{ p: 2, pb: 0 }}>
											<Stack sx={{ mb: 2 }}>
												<Stack direction="row" spacing={0.5} alignItems="center">
													<Typography variant="h4">Good Morning,</Typography>
													<Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
														{user?.name}
													</Typography>
												</Stack>
												<Typography variant="subtitle2">Project Admin</Typography>
											</Stack>
											<Divider />
										</Box>
										<PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
											<Box sx={{ p: 2, pt: 0 }}>
												<Card
													sx={{
														bgcolor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
														my: 2
													}}
												>
													<CardContent>
														<Grid container spacing={3} direction="column">
															<Grid item>
																<Grid item container alignItems="center" justifyContent="space-between">
																	<Grid item>
																		<Typography variant="subtitle1">Start DND Mode</Typography>
																	</Grid>
																	<Grid item>
																		<Switch
																			color="primary"
																			checked={sdm}
																			onChange={(e) => setSdm(e.target.checked)}
																			name="sdm"
																			size="small"
																		/>
																	</Grid>
																</Grid>
															</Grid>
															<Grid item>
																<Grid item container alignItems="center" justifyContent="space-between">
																	<Grid item>
																		<Typography variant="subtitle1">Allow Notifications</Typography>
																	</Grid>
																	<Grid item>
																		<Switch
																			checked={notification}
																			onChange={(e) => setNotification(e.target.checked)}
																			name="sdm"
																			size="small"
																		/>
																	</Grid>
																</Grid>
															</Grid>
														</Grid>
													</CardContent>
												</Card>
												<Divider />
												<List
													component="nav"
													sx={{
														width: '100%',
														maxWidth: 350,
														minWidth: 300,
														backgroundColor: theme.palette.background.paper,
														borderRadius: '10px',
														[theme.breakpoints.down('md')]: {
															minWidth: '100%'
														},
														'& .MuiListItemButton-root': {
															mt: 0.5
														}
													}}
												>
													<ListItemButton
														sx={{ borderRadius: `${borderRadius}px` }}
														selected={_.includes([`/profile`], location.pathname)}
														onClick={() => handleListItemClick('/profile')}
													>
														<ListItemIcon>
															<IconSettings stroke={1.5} size="1.3rem" />
														</ListItemIcon>
														<ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
													</ListItemButton>
													<ListItemButton
														sx={{ borderRadius: `${borderRadius}px` }}
														selected={_.includes([`/posts`], location.pathname)}
														onClick={() => handleListItemClick('/posts')}
													>
														<ListItemIcon>
															<IconUser stroke={1.5} size="1.3rem" />
														</ListItemIcon>
														<ListItemText
															primary={
																<Grid container spacing={1} justifyContent="space-between">
																	<Grid item>
																		<Typography variant="body2">Social Profile</Typography>
																	</Grid>
																	<Grid item>
																		<Chip
																			label="02"
																			size="small"
																			sx={{
																				bgcolor:
																					theme.palette.mode === 'dark'
																						? theme.palette.dark.dark
																						: theme.palette.warning.dark,
																				color: theme.palette.background.default
																			}}
																		/>
																	</Grid>
																</Grid>
															}
														/>
													</ListItemButton>
													<ListItemButton sx={{ borderRadius: `${borderRadius}px` }} onClick={handleLogout}>
														<ListItemIcon>
															<IconLogout stroke={1.5} size="1.3rem" />
														</ListItemIcon>
														<ListItemText primary={<Typography variant="body2">Logout</Typography>} />
													</ListItemButton>
												</List>
											</Box>
										</PerfectScrollbar>
									</MainCard>
								)}
							</Paper>
						</Transitions>
					</ClickAwayListener>
				)}
			</Popper>
		</>
	);
};

export default ProfileSection;
