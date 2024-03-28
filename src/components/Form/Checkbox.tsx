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

	const containerClasses = classNames('form-control', className);

	const inputClasses = classNames(
		'checkbox',
		{
			'checkbox-primary': color === 'primary',
			'checkbox-secondary': color === 'secondary',
			'checkbox-accent': color === 'accent',
			'checkbox-info': color === 'info',
			'checkbox-success': color === 'success',
			'checkbox-warning': color === 'warning',
			'checkbox-error': color === 'error'
		},
		{
			'checkbox-lg': size === 'lg',
			'checkbox-md': size === 'md',
			'checkbox-sm': size === 'sm',
			'checkbox-xs': size === 'xs'
		},
		{
			'checkbox-error': error
		}
	);

	return (
		<div className={containerClasses}>
			<label className="label justify-start p-0">
				<input {...props} className={inputClasses} type="checkbox" id={id} name={name} />
				<span className="label-text ml-2">{children}</span>
			</label>
			{error && (
				<label className="label">
					<span className="label-text-alt text-error">{helperText}</span>
				</label>
			)}
		</div>
	);
};

export default CheckboxForm;
