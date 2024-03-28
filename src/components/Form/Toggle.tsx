import classNames from 'classnames';
import { useId } from 'react';

type Props = {
	className?: string;
	color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
	size?: 'lg' | 'md' | 'sm' | 'xs';
	name: string;
	label?: string;
	error?: boolean;
	helperText?: string;
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'color' | 'size'>;

const ToggleForm = ({ className, color = 'primary', size = 'md', name, label, error = false, helperText, ...props }: Props) => {
	const id = useId();

	const containerClasses = classNames('form-control', className);

	const inputClasses = classNames(
		'toggle',
		{
			'toggle-primary': color === 'primary',
			'toggle-secondary': color === 'secondary',
			'toggle-accent': color === 'accent',
			'toggle-info': color === 'info',
			'toggle-success': color === 'success',
			'toggle-warning': color === 'warning',
			'toggle-error': color === 'error'
		},
		{
			'toggle-lg': size === 'lg',
			'toggle-md': size === 'md',
			'toggle-sm': size === 'sm',
			'toggle-xs': size === 'xs'
		},
		{
			'toggle-error': error
		}
	);

	return (
		<div className={containerClasses}>
			{label && (
				<label className="label mb-2 p-0">
					<span className="label-text">{label}</span>
				</label>
			)}
			<input {...props} className={inputClasses} type="checkbox" id={id} name={name} />
			{error && (
				<label className="label mt-2 p-0">
					<span className="label-text-alt text-error">{helperText}</span>
				</label>
			)}
		</div>
	);
};

export default ToggleForm;
