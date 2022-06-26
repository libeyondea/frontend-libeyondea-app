import { Fragment } from 'react';

import BreadcrumbComponent from 'src/components/Breadcrumb/components';
import CardComponent from 'src/components/Card/components';

const DashboardComponent = () => {
	return (
		<Fragment>
			<BreadcrumbComponent className="mb-4">Dashboard</BreadcrumbComponent>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-12 sm:col-span-6 md:col-span-3">
					<CardComponent>
						<h3 className="text-2xl font-bold">500</h3>
						<p>Total user</p>
					</CardComponent>
				</div>
				<div className="col-span-12 sm:col-span-6 md:col-span-3">
					<CardComponent>
						<h3 className="text-2xl font-bold">500</h3>
						<p>Total user</p>
					</CardComponent>
				</div>
				<div className="col-span-12 sm:col-span-6 md:col-span-3">
					<CardComponent>
						<h3 className="text-2xl font-bold">500</h3>
						<p>Total user</p>
					</CardComponent>
				</div>
				<div className="col-span-12 sm:col-span-6 md:col-span-3">
					<CardComponent>
						<h3 className="text-2xl font-bold">500</h3>
						<p>Total user</p>
					</CardComponent>
				</div>
			</div>
		</Fragment>
	);
};

export default DashboardComponent;
