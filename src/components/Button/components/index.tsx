import classNames from 'classnames';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type Props = {
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	isLoading?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const ButtonComponent: React.FC<Props> = ({
	className,
	type = 'submit',
	isLoading = false,
	disabled = false,
	children,
	...props
}) => (
	<button
		type={type}
		className={classNames(
			'flex items-center justify-center py-3 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md',
			className,
			{
				'cursor-not-allowed disabled:opacity-50': disabled
			}
		)}
		disabled={disabled}
		{...props}
	>
		{isLoading && <AiOutlineLoading3Quarters className="animate-spin h-4 w-4 mr-2 font-medium" />}
		<span>{children}</span>
	</button>
);

export default ButtonComponent;
