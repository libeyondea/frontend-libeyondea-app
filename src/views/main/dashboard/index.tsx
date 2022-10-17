import Stat from 'src/components/Stat';
import useOnceEffect from 'src/hooks/useOnceEffect';
import dashboardService from 'src/services/dashboardService';
import { useDispatch, useSelector } from 'src/store';
import { dashboardShowDataRequestAction, dashboardShowLoadingRequestAction } from 'src/store/dashboard/actions';
import { selectDashboardShow } from 'src/store/dashboard/selectors';
import errorHandler from 'src/utils/errorHandler';

const DashboardPage = () => {
	const dispatch = useDispatch();
	const dashboardShow = useSelector(selectDashboardShow);

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
		<div className="grid grid-cols-12 gap-4">
			<div className="col-span-12 sm:col-span-6 md:col-span-3">
				<Stat title="Total User" value={dashboardShow.data.user?.total} />
			</div>
		</div>
	);
};

export default DashboardPage;
