import classNames from 'classnames';

import { SyncIcon } from 'src/components/Icon';

type Props = {
	className?: string;
};

const SpinLoading = ({ className }: Props) => {
	return (
		<div className={classNames('flex justify-center', className)}>
			<SyncIcon className="h-8 w-8 animate-spin text-base-content" />
		</div>
	);
};

export default SpinLoading;
