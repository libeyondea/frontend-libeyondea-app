import classNames from 'classnames';
import { FaSyncAlt } from 'react-icons/fa';

type Props = {
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	loading?: boolean;
	disabled?: boolean;
	styleType?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
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
				'bg-gray-500 hover:bg-gray-600 focus:ring-gray-400 focus:ring-offset-gray-100 text-white': styleType === 'secondary',
				'bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white': styleType === 'success',
				'bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white': styleType === 'danger',
				'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 focus:ring-offset-yellow-200 text-white': styleType === 'warning',
				'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white': styleType === 'info',
				'bg-gray-800 hover:bg-gray-900 focus:ring-gray-700 focus:ring-offset-gray-400 text-white': styleType === 'dark',
				'bg-gray-100 hover:bg-gray-300 focus:ring-gray-200 focus:ring-offset-gray-100 text-gray-900': styleType === 'light',
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
