import classNames from 'classnames';
import { FaSyncAlt } from 'react-icons/fa';

type Props = {
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	loading?: boolean;
	disabled?: boolean;
	styleType?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'default';
	children: React.ReactNode;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const ButtonComponent: React.FC<Props> = ({ className, type = 'button', loading = false, disabled = false, styleType = 'primary', children, ...props }) => (
	<button
		{...props}
		type={type}
		className={classNames(
			'flex items-center justify-center py-3 px-4 transition ease-in duration-200 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md',
			{
				'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white': styleType === 'primary',
				'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white': styleType === 'secondary',
				'bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white': styleType === 'success',
				'bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white': styleType === 'danger',
				'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-orange-200 text-white': styleType === 'warning',
				'bg-gray-100 hover:bg-gray-300 focus:ring-gray-200 focus:ring-offset-gray-100 text-gray-900': styleType === 'default',
				'cursor-not-allowed disabled:opacity-50': disabled
			},
			className
		)}
		disabled={disabled}
	>
		{loading && <FaSyncAlt className="animate-spin h-4 w-4 mr-2" />}
		<span>{children}</span>
	</button>
);

export default ButtonComponent;
