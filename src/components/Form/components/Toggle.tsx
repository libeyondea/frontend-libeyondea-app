import classNames from 'classnames';

type Props = {
	className?: string;
	name: string;
	label?: string;
	horizontal?: boolean;
	error?: string;
	touched?: boolean;
} & React.ComponentPropsWithoutRef<'input'>;

const ToggleFormComponent = ({ className, name, label, horizontal = false, error, touched = false, ...props }: Props) => {
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
			<div className="flex">
				<label htmlFor={name} className="relative inline-flex items-center cursor-pointer">
					<input {...props} name={name} type="checkbox" className="sr-only peer" />
					<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
				</label>
			</div>
			{error && touched && <div className="text-red-700 mt-1 text-sm">{error}</div>}
		</div>
	);
};

export default ToggleFormComponent;
