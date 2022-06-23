import classNames from 'classnames';

import { SyncIconComponent } from 'src/components/Icon/components';

type Props = {
	className?: string;
	blocked?: boolean;
};

const BlockUIComponent = ({ className, blocked = false }: Props) => {
	return blocked ? (
		<div className={classNames('absolute inset-0 w-full h-full cursor-wait overflow-hidden rounded-md', className)}>
			<div className="w-full h-full opacity-75 bg-gray-400" />
			<div className="absolute top-1/2 right-1/2 text-center -translate-y-1/2 translate-x-1/2">
				<SyncIconComponent className="animate-spin w-8 h-8 text-gray-600" />
			</div>
		</div>
	) : null;
};

export default BlockUIComponent;
