import classNames from 'classnames';
import { RiLoader2Line } from 'react-icons/ri';

type Props = {
	className?: string;
};

const LoadingComponent: React.FC<Props> = ({ className }) => {
	return (
		<div className={classNames('flex justify-center', className)}>
			<RiLoader2Line className="animate-spin w-10 h-10 text-gray-600" />
		</div>
	);
};

export default LoadingComponent;
