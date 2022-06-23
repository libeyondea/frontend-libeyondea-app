import classNames from 'classnames';

type Props = {
	className?: string;
	name: string;
	error?: string;
	touched?: boolean;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'input'>;

const CheckboxFormComponent = ({ className, name, error, touched = false, children, ...props }: Props) => {
	return (
		<div className={classNames('flex-row', className)}>
			<div className="flex items-center">
				<input {...props} name={name} type="checkbox" className="text-purple-500 border-gray-300 rounded checked:bg-purple-500 focus:ring-purple-600" />
				<label htmlFor={name} className="ml-2 block text-sm text-gray-900">
					{children}
				</label>
			</div>
			{error && touched && <div className="text-red-700 mt-1 text-sm">{error}</div>}
		</div>
	);
};

export default CheckboxFormComponent;
