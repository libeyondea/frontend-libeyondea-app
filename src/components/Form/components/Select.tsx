import classNames from 'classnames';

type Props = {
	className?: string;
	name: string;
	label: string;
	isError: boolean;
	errorMessage?: string;
} & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

const Select: React.FC<Props> = ({ className, name, label, isError, errorMessage, ...props }) => {
	return (
		<div className={classNames('', className)}>
			<label htmlFor={name} className="inline-block font-medium text-gray-600 mb-1">
				{label}
			</label>
			<div className="relative">
				<select
					{...props}
					name={name}
					className={classNames(
						'capitalize rounded-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent',
						{
							'focus:ring-red-600 border-red-600': isError
						}
					)}
				>
					{props.children}
				</select>
			</div>
			{isError && <div className="text-red-700 mt-1 text-sm">{errorMessage}</div>}
		</div>
	);
};

export default Select;
