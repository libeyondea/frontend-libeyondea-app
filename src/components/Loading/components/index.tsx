import classNames from 'classnames';
import { FaSyncAlt } from 'react-icons/fa';

type Props = {
	className?: string;
};

const LoadingComponent: React.FC<Props> = ({ className }) => {
	return (
		<div className={classNames('flex justify-center', className)}>
			<FaSyncAlt className="animate-spin w-8 h-8 text-gray-600" />
		</div>
	);
};

export default LoadingComponent;
