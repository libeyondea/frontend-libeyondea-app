import { Divider, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import AuthCardWrapper from '../AuthCardWrapper';
import AuthWrapper1 from '../AuthWrapper1';
import AuthForgotPassword from './auth-forms/AuthForgotPassword';
import useAuth from 'src/hooks/useAuth';
import Logo from 'src/ui-component/Logo';

const ForgotPassword = () => {
	const theme = useTheme();
	const { isLoggedIn } = useAuth();
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
													Forgot password?
												</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography variant="caption" fontSize="16px" textAlign="center">
													Enter your email address below and we&apos;ll send you password reset OTP.
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={12}>
										<AuthForgotPassword />
									</Grid>
									<Grid item xs={12}>
										<Divider />
									</Grid>
									<Grid item xs={12}>
										<Grid item container direction="column" alignItems="center" xs={12}>
											<Typography
												component={Link}
												to={isLoggedIn ? '/pages/login/login3' : '/login'}
												variant="subtitle1"
												sx={{ textDecoration: 'none' }}
											>
												Already have an account?
											</Typography>
										</Grid>
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

export default ForgotPassword;
