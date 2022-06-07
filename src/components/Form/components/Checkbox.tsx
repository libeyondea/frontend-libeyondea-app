import classNames from 'classnames';

type Props = {
	className?: string;
	name: string;
	error?: string;
	touched?: boolean;
	children: React.ReactNode;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const CheckboxFormComponent: React.FC<Props> = ({ className, name, error, touched = false, children, ...props }) => {
	return (
		<div className={classNames('flex-row', className)}>
			<div className="flex items-center">
				<input
					{...props}
					name={name}
					type="checkbox"
					className="h-4 w-4 text-purple-600 checked:bg-purple-600 focus:ring-purple-500 border-gray-300 rounded"
				/>
				<label htmlFor={name} className="ml-2 block text-sm text-gray-900">
					{children}
				</label>
			</div>
			{error && touched && <div className="text-red-700 mt-1 text-sm">{error}</div>}
		</div>
	);
};

export default CheckboxFormComponent;
