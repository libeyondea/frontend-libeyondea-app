import classNames from 'classnames';

import { SyncIcon } from 'src/components/Icon';

type Props = {
	className?: string;
};

const SpinLoading = ({ className }: Props) => {
	return (
		<div className={classNames('flex justify-center', className)}>
			<SyncIcon className="animate-spin w-8 h-8 text-gray-600" />
		</div>
	);
};

export default SpinLoading;
