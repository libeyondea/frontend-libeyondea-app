import BreadcrumbComponent from 'components/Breadcrumb/components';
import CardComponent from 'components/Card/components';
import { Fragment } from 'react';

type Props = {};

const SettingComponent: React.FC<Props> = () => {
	return (
		<Fragment>
			<BreadcrumbComponent className="mb-4">Settings</BreadcrumbComponent>
			<div className="grid grid-cols-1 gap-4">
				<div className="col-span-1 w-full">
					<CardComponent>Settings</CardComponent>
				</div>
			</div>
		</Fragment>
	);
};

export default SettingComponent;
