import classNames from 'classnames';
import { useId } from 'react';

type Props = {
	className?: string;
	color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
	size?: 'lg' | 'md' | 'sm' | 'xs';
	name: string;
	error?: boolean;
	helperText?: string;
	children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'color' | 'size'>;

const CheckboxForm = ({ className, color = 'primary', size = 'md', name, error = false, helperText, children, ...props }: Props) => {
	const id = useId();

	return (
		<div className={classNames('flex items-center', className)}>
			<div className="flex items-center">
				<input
					{...props}
					className="rounded border-gray-300 text-purple-500 checked:bg-purple-500 focus:ring-purple-600"
					id={id}
					name={name}
					type="checkbox"
				/>
				<label htmlFor={name} className="ml-2 block text-sm text-gray-900">
					{children}
				</label>
			</div>
			{error && <div className="mt-1 text-sm text-red-700">{error}</div>}
		</div>
	);
};

export default CheckboxForm;
