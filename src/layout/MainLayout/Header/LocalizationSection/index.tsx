import { Avatar, Box, ClickAwayListener, Grid, List, ListItemButton, ListItemText, Paper, Popper, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import useConfig from 'src/hooks/useConfig';
import Transitions from 'src/ui-component/extended/Transitions';

const LocalizationSection = () => {
	const { borderRadius, locale, onChangeLocale } = useConfig();
	const theme = useTheme();
	const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
	const [language, setLanguage] = useState<string>(locale);

	const handleListItemClick = (lng: string) => {
		handleClose();
		setLanguage(lng);
		onChangeLocale(lng);
	};

	const handleToggle = (event: React.MouseEvent<HTMLDivElement>) => {
		setOpen((prevOpen) => !prevOpen);
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(false);
		setAnchorEl(null);
	};

	useEffect(() => {
		setLanguage(locale);
	}, [locale]);

	return (
		<>
			<Box
				sx={{
					ml: 2
					/* [theme.breakpoints.down('md')]: {
						ml: 1
					} */
				}}
			>
				<Avatar
					variant="rounded"
					sx={{
						...theme.typography.commonAvatar,
						...theme.typography.mediumAvatar,
						border: '1px solid',
						borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
						background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
						color: theme.palette.primary.dark,
						transition: 'all .2s ease-in-out',
						'&:hover': {
							borderColor: theme.palette.primary.main,
							background: theme.palette.primary.main,
							color: theme.palette.primary.light
						}
					}}
					onClick={handleToggle}
					color="inherit"
				>
					<Typography variant="h5" sx={{ textTransform: 'uppercase' }} color="inherit">
						{language}
					</Typography>
				</Avatar>
			</Box>
			<Popper
				placement="bottom"
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
						<Transitions position="top" in={open} {...TransitionProps}>
							<Paper elevation={16}>
								{open && (
									<List
										component="nav"
										sx={{
											width: '100%',
											minWidth: 200,
											maxWidth: 280,
											bgcolor: theme.palette.background.paper,
											borderRadius: `${borderRadius}px`,
											[theme.breakpoints.down('md')]: {
												maxWidth: 250
											}
										}}
									>
										<ListItemButton selected={language === 'en'} onClick={() => handleListItemClick('en')}>
											<ListItemText
												primary={
													<Grid container>
														<Typography color="textPrimary">English</Typography>
														<Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
															(UK)
														</Typography>
													</Grid>
												}
											/>
										</ListItemButton>
										<ListItemButton selected={language === 'fr'} onClick={() => handleListItemClick('fr')}>
											<ListItemText
												primary={
													<Grid container>
														<Typography color="textPrimary">français</Typography>
														<Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
															(French)
														</Typography>
													</Grid>
												}
											/>
										</ListItemButton>
										<ListItemButton selected={language === 'ro'} onClick={() => handleListItemClick('ro')}>
											<ListItemText
												primary={
													<Grid container>
														<Typography color="textPrimary">Română</Typography>
														<Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
															(Romanian)
														</Typography>
													</Grid>
												}
											/>
										</ListItemButton>
										<ListItemButton selected={language === 'zh'} onClick={() => handleListItemClick('zh')}>
											<ListItemText
												primary={
													<Grid container>
														<Typography color="textPrimary">中国人</Typography>
														<Typography variant="caption" color="textSecondary" sx={{ ml: '8px' }}>
															(Chinese)
														</Typography>
													</Grid>
												}
											/>
										</ListItemButton>
									</List>
								)}
							</Paper>
						</Transitions>
					</ClickAwayListener>
				)}
			</Popper>
		</>
	);
};

export default LocalizationSection;
