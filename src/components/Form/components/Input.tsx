import classNames from 'classnames';

type Props = {
	className?: string;
	name: string;
	label?: string;
	horizontal?: boolean;
	error?: string;
	touched?: boolean;
} & React.ComponentPropsWithoutRef<'input'>;

const InputFormComponent = ({ className, name, label, horizontal = false, error, touched = false, ...props }: Props) => {
	return (
		<div
			className={classNames(
				{
					'flex items-center': horizontal
				},
				className
			)}
		>
			{label && (
				<label htmlFor={name} className={classNames('inline-block font-medium text-gray-600', horizontal ? 'mr-1' : 'mb-1')}>
					{label}
				</label>
			)}
			<div className="relative">
				<input
					{...props}
					name={name}
					className={classNames(
						'py-[7px] rounded-md border-gray-300 w-full text-gray-700 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-transparent',
						{
							'focus:ring-red-600 border-red-600': error && touched
						}
					)}
				/>
			</div>
			{error && touched && <div className="text-red-700 mt-1 text-sm">{error}</div>}
		</div>
	);
};

export default InputFormComponent;
