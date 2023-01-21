import {
	Avatar,
	Box,
	Button,
	CardActions,
	Chip,
	ClickAwayListener,
	Divider,
	Grid,
	Paper,
	Popper,
	Stack,
	TextField,
	Typography,
	useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconBell } from '@tabler/icons';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';

import NotificationList from './NotificationList';
import MainCard from 'src/ui-component/cards/MainCard';
import Transitions from 'src/ui-component/extended/Transitions';

const status = [
	{
		value: 'all',
		label: 'All Notification'
	},
	{
		value: 'new',
		label: 'New'
	},
	{
		value: 'unread',
		label: 'Unread'
	},
	{
		value: 'other',
		label: 'Other'
	}
];

const NotificationSection = () => {
	const theme = useTheme();
	const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
	const [value, setValue] = useState('');

	const handleToggle = (event: React.MouseEvent<HTMLDivElement>) => {
		setOpen((prevOpen) => !prevOpen);
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(false);
		setAnchorEl(null);
	};

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
		event?.target.value && setValue(event?.target.value);
	};

	return (
		<>
			<Box
				sx={{
					ml: 2,
					mr: 3,
					[theme.breakpoints.down('md')]: {
						mr: 2
					}
				}}
			>
				<Avatar
					variant="rounded"
					sx={{
						...theme.typography.commonAvatar,
						...theme.typography.mediumAvatar,
						transition: 'all .2s ease-in-out',
						background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
						color: theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.secondary.dark,
						'&:hover': {
							background: theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.secondary.dark,
							color: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.secondary.light
						}
					}}
					onClick={handleToggle}
					color="inherit"
				>
					<IconBell stroke={1.5} size="1.3rem" />
				</Avatar>
			</Box>
			<Popper
				placement={matchesXs ? 'bottom' : 'bottom-end'}
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
								offset: [0, 20]
							}
						}
					]
				}}
			>
				{({ TransitionProps }) => (
					<ClickAwayListener onClickAway={handleClose}>
						<Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
							<Paper>
								{open && (
									<MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
										<Grid container direction="column" spacing={2}>
											<Grid item xs={12}>
												<Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
													<Grid item>
														<Stack direction="row" spacing={2}>
															<Typography variant="subtitle1">All Notification</Typography>
															<Chip
																size="small"
																label="01"
																sx={{
																	color: theme.palette.background.default,
																	bgcolor: theme.palette.warning.dark
																}}
															/>
														</Stack>
													</Grid>
													<Grid item>
														<Typography component={Link} to="#" variant="subtitle2" color="primary">
															Mark as all read
														</Typography>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12}>
												<PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}>
													<Grid container direction="column" spacing={2}>
														<Grid item xs={12}>
															<Box sx={{ px: 2, pt: 0.25 }}>
																<TextField
																	id="outlined-select-currency-native"
																	select
																	fullWidth
																	value={value}
																	onChange={handleChange}
																	SelectProps={{
																		native: true
																	}}
																>
																	{status.map((option) => (
																		<option key={option.value} value={option.value}>
																			{option.label}
																		</option>
																	))}
																</TextField>
															</Box>
														</Grid>
														<Grid item xs={12} p={0}>
															<Divider sx={{ my: 0 }} />
														</Grid>
													</Grid>
													<NotificationList />
												</PerfectScrollbar>
											</Grid>
										</Grid>
										<Divider />
										<CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
											<Button size="small" disableElevation>
												View All
											</Button>
										</CardActions>
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

export default NotificationSection;
