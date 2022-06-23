import classNames from 'classnames';

import { SyncIconComponent } from 'src/components/Icon/components';

type Props = {
	className?: string;
};

const LoadingComponent = ({ className }: Props) => {
	return (
		<div className={classNames('flex justify-center', className)}>
			<SyncIconComponent className="animate-spin w-8 h-8 text-gray-600" />
		</div>
	);
};

export default LoadingComponent;
