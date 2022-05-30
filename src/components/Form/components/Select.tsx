import classNames from 'classnames';

type Props = {
	className?: string;
	classNameInput?: string;
	name: string;
	label?: string;
	isHorizontal?: boolean;
	isError?: boolean;
	errorMessage?: string;
} & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

const Select: React.FC<Props> = ({
	className,
	classNameInput,
	name,
	label,
	isHorizontal = false,
	isError = false,
	errorMessage,
	...props
}) => {
	return (
		<div
			className={classNames(
				'',
				{
					'flex items-center': isHorizontal
				},
				className
			)}
		>
			{label && (
				<label
					htmlFor={name}
					className={classNames('inline-block font-medium text-gray-600', {
						'mr-1': isHorizontal,
						'mb-1': !isHorizontal
					})}
				>
					{label}
				</label>
			)}
			<div className="relative">
				<select
					{...props}
					name={name}
					className={classNames(
						'rounded-md flex-1 appearance-none border border-gray-300 w-full py-2 pl-4 pr-8 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent',
						{
							'focus:ring-red-600 border-red-600': isError
						},
						classNameInput
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
