import classNames from 'classnames';
import { useId } from 'react';

type Props = {
	className?: string;
	name: string;
	error?: boolean;
	helperText?: string;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'input'>;

const CheckboxForm = ({ className, name, error = false, helperText, children, ...props }: Props) => {
	const id = useId();

	return (
		<div className={classNames('flex items-center', className)}>
			<div className="flex items-center">
				<input
					{...props}
					className="rounded border-gray-300 text-blue-500 checked:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
					id={id}
					name={name}
					type="checkbox"
				/>
				<label htmlFor={id} className="ml-2 block text-sm text-gray-900">
					{children}
				</label>
			</div>
			{error && <div className="mt-1 text-sm text-red-700">{error}</div>}
		</div>
	);
};

export default CheckboxForm;
