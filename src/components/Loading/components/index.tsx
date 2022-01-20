import { RiLoader2Line } from 'react-icons/ri';

type Props = {};

const Loadingomponent: React.FC<Props> = () => {
	return (
		<div className="flex justify-center">
			<RiLoader2Line className="animate-spin w-10 h-10 text-gray-600" />
		</div>
	);
};

export default Loadingomponent;
