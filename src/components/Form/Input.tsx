import classNames from 'classnames';
import { useId } from 'react';

type Props = {
	className?: string;
	color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost';
	size?: 'lg' | 'md' | 'sm' | 'xs';
	type?: 'text' | 'password';
	bordered?: boolean;
	focusOutline?: boolean;
	name: string;
	label?: string;
	error?: boolean;
	helperText?: string;
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'color' | 'size'>;

const InputForm = ({
	className,
	color = 'primary',
	size = 'md',
	type = 'text',
	name,
	label,
	error = false,
	helperText,
	bordered = true,
	focusOutline = true,
	...props
}: Props) => {
	const id = useId();

	const containerClasses = classNames('form-control w-full', className);

	const inputClasses = classNames(
		'input',
		{
			'input-primary': color === 'primary',
			'input-secondary': color === 'secondary',
			'input-accent': color === 'accent',
			'input-info': color === 'info',
			'input-success': color === 'success',
			'input-warning': color === 'warning',
			'input-error': color === 'error',
			'input-ghost': color === 'ghost'
		},
		{
			'input-lg': size === 'lg',
			'input-md': size === 'md',
			'input-sm': size === 'sm',
			'input-xs': size === 'xs'
		},
		{
			'input-bordered': bordered,
			'focus:outline-none': !focusOutline,
			'input-error': error
		}
	);

	return (
		<div className={containerClasses}>
			{label && (
				<label className="label mb-2 p-0">
					<span className="label-text">{label}</span>
				</label>
			)}
			<input {...props} className={inputClasses} type={type} id={id} name={name} placeholder={label} />
			{error && (
				<label className="label mt-2 p-0">
					<span className="label-text-alt text-error">{helperText}</span>
				</label>
			)}
		</div>
	);
};

export default InputForm;
