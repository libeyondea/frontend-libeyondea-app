import { RiLoader2Line } from 'react-icons/ri';

type Props = {
	isBlocking?: boolean;
};

const BlockUIComponent: React.FC<Props> = ({ isBlocking = false }) => {
	return isBlocking ? (
		<div className="absolute inset-0 w-full h-full cursor-wait overflow-hidden">
			<div className="w-full h-full opacity-75 bg-gray-400"></div>
			<div className="absolute top-1/2 right-1/2 text-center -translate-y-1/2 translate-x-1/2">
				<RiLoader2Line className="animate-spin w-16 h-16 text-gray-600" />
			</div>
		</div>
	) : null;
};

export default BlockUIComponent;
