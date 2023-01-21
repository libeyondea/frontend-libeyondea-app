import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import AuthCardWrapper from '../AuthCardWrapper';
import AuthWrapper1 from '../AuthWrapper1';
import AuthResetPassword from './auth-forms/AuthResetPassword';
import Logo from 'src/ui-component/Logo';

const ResetPassword = () => {
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
										<Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
											<Grid item>
												<Stack alignItems="center" justifyContent="center" spacing={1}>
													<Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
														Reset Password
													</Typography>
													<Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
														Please choose your new password
													</Typography>
												</Stack>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={12}>
										<AuthResetPassword />
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

export default ResetPassword;
