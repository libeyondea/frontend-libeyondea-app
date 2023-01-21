import { AppBar, Box, ClickAwayListener, Grid, IconButton, Paper, Popper, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconDotsVertical } from '@tabler/icons';
import { useState } from 'react';

import LocalizationSection from '../LocalizationSection';
import Transitions from 'src/ui-component/extended/Transitions';

const MobileSection = () => {
	const theme = useTheme();
	const matchMobile = useMediaQuery(theme.breakpoints.down('md'));

	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
		setOpen((prevOpen) => !prevOpen);
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setOpen(false);
		setAnchorEl(null);
	};

	return (
		<>
			<Box component="span" sx={{ mt: 1, ml: 1 }}>
				<IconButton sx={{ color: theme.palette.mode === 'dark' ? 'primary.main' : 'inherit', ml: 0.5, cursor: 'pointer' }} onClick={handleToggle}>
					<IconDotsVertical stroke={1.5} style={{ fontSize: '1.5rem' }} />
				</IconButton>
			</Box>
			<Popper
				placement="bottom-end"
				open={open}
				anchorEl={anchorEl}
				role={undefined}
				transition
				disablePortal
				style={{ width: '100%', zIndex: 1 }}
				popperOptions={{
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: [0, matchMobile ? 30 : 10]
							}
						}
					]
				}}
			>
				{({ TransitionProps }) => (
					<ClickAwayListener onClickAway={handleClose}>
						<Transitions type="zoom" in={open} {...TransitionProps} sx={{ transformOrigin: 'top right' }}>
							<Paper>
								{open && (
									<AppBar
										color="inherit"
										sx={{
											[theme.breakpoints.down('md')]: {
												background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
											}
										}}
									>
										<Toolbar sx={{ pt: 2.75, pb: 2.75 }}>
											<Grid container justifyContent={matchMobile ? 'space-between' : 'flex-end'} alignItems="center">
												<LocalizationSection />
											</Grid>
										</Toolbar>
									</AppBar>
								)}
							</Paper>
						</Transitions>
					</ClickAwayListener>
				)}
			</Popper>
		</>
	);
};

export default MobileSection;
