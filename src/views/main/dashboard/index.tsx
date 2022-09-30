import { Fragment } from 'react';

import Breadcrumb from 'src/components/Breadcrumb/components';
import Card from 'src/components/Card/components';
import { SpinLoading } from 'src/components/Loading/components';
import errorHandler from 'src/helpers/errorHandler';
import useAppDispatch from 'src/hooks/useAppDispatch';
import useAppSelector from 'src/hooks/useAppSelector';
import useOnceEffect from 'src/hooks/useOnceEffect';
import dashboardService from 'src/services/dashboard';
import { dashboardShowDataRequestAction, dashboardShowLoadingRequestAction } from 'src/store/dashboard/actions';
import { selectDashboardShow } from 'src/store/dashboard/selectors';

const DashboardPage = () => {
	const dispatch = useAppDispatch();
	const dashboardShow = useAppSelector(selectDashboardShow);

	useOnceEffect(() => {
		dispatch(dashboardShowLoadingRequestAction(true));
		dashboardService
			.show()
			.then((response) => {
				dispatch(dashboardShowDataRequestAction(response.data.data));
			})
			.catch(errorHandler())
			.finally(() => {
				dispatch(dashboardShowLoadingRequestAction(false));
			});
	});

	return (
		<Fragment>
			<Breadcrumb className="mb-4">Dashboard</Breadcrumb>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-12 sm:col-span-6 md:col-span-3">
					<Card>
						{dashboardShow.loading ? (
							<SpinLoading />
						) : (
							<Fragment>
								<h3 className="text-2xl font-bold">{dashboardShow.data.user.total}</h3>
								<p>Total user</p>
							</Fragment>
						)}
					</Card>
				</div>
				<div className="col-span-12 sm:col-span-6 md:col-span-3">
					<Card>
						{dashboardShow.loading ? (
							<SpinLoading />
						) : (
							<Fragment>
								<h3 className="text-2xl font-bold">{dashboardShow.data.user.total}</h3>
								<p>Total user</p>
							</Fragment>
						)}
					</Card>
				</div>
				<div className="col-span-12 sm:col-span-6 md:col-span-3">
					<Card>
						{dashboardShow.loading ? (
							<SpinLoading />
						) : (
							<Fragment>
								<h3 className="text-2xl font-bold">{dashboardShow.data.user.total}</h3>
								<p>Total user</p>
							</Fragment>
						)}
					</Card>
				</div>
				<div className="col-span-12 sm:col-span-6 md:col-span-3">
					<Card>
						{dashboardShow.loading ? (
							<SpinLoading />
						) : (
							<Fragment>
								<h3 className="text-2xl font-bold">{dashboardShow.data.user.total}</h3>
								<p>Total user</p>
							</Fragment>
						)}
					</Card>
				</div>
			</div>
		</Fragment>
	);
};

export default DashboardPage;
