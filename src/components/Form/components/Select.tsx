import classNames from 'classnames';

type Props = {
	className?: string;
	name: string;
	label?: string;
	options: Array<{ value: any; label: any }>;
	isHorizontal?: boolean;
	error?: string;
	touched?: boolean;
} & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

const SelectFormComponent: React.FC<Props> = ({ className, name, label, options, isHorizontal = false, error, touched = false, ...props }) => {
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
				<label htmlFor={name} className={classNames('inline-block font-medium text-gray-600', isHorizontal ? 'mr-1' : 'mb-1')}>
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
							'focus:ring-red-600 border-red-600': error && touched
						}
					)}
				>
					{options.map((option, index) => (
						<option value={option.value} key={index}>
							{option.label}
						</option>
					))}
				</select>
			</div>
			{error && touched && <div className="text-red-700 mt-1 text-sm">{error}</div>}
		</div>
	);
};

export default SelectFormComponent;
