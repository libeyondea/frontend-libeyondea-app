import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import AuthCardWrapper from '../AuthCardWrapper';
import AuthWrapper1 from '../AuthWrapper1';
import Logo from 'src/ui-component/Logo';
import AnimateButton from 'src/ui-component/extended/AnimateButton';

const CheckMail = () => {
	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<AuthWrapper1>
			<Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
				<Grid item xs={12}>
					<Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
						<Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
							<AuthCardWrapper>
								<Grid container spacing={2} alignItems="center" justifyContent="center">
									<Grid item sx={{ mb: 3 }}>
										<Link to="#">
											<Logo />
										</Link>
									</Grid>
									<Grid item xs={12}>
										<Grid container alignItems="center" justifyContent="center" textAlign="center" spacing={2}>
											<Grid item xs={12}>
												<Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
													Hi, Check Your Mail
												</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
													We have sent a password recover instructions to your email.
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={12}>
										<AnimateButton>
											<Button disableElevation fullWidth size="large" type="submit" variant="contained" color="secondary">
												Open Mail
											</Button>
										</AnimateButton>
									</Grid>
								</Grid>
							</AuthCardWrapper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</AuthWrapper1>
	);
};

export default CheckMail;
