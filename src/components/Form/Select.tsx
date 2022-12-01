import classNames from 'classnames';
import _ from 'lodash';
import { useId } from 'react';

type Props = {
	className?: string;
	color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost';
	size?: 'lg' | 'md' | 'sm' | 'xs';
	bordered?: boolean;
	focusOutline?: boolean;
	name: string;
	label?: string;
	options: string[] | number[];
	error?: boolean;
	helperText?: string;
} & Omit<React.ComponentPropsWithoutRef<'select'>, 'color' | 'size'>;

const SelectForm = ({
	className,
	color = 'primary',
	size = 'md',
	bordered = true,
	focusOutline = true,
	name,
	label,
	options,
	error = false,
	helperText,
	...props
}: Props) => {
	const id = useId();

	const containerClasses = classNames('form-control w-full', className);

	const selectClasses = classNames(
		'select',
		{
			'select-primary': color === 'primary',
			'select-secondary': color === 'secondary',
			'select-accent': color === 'accent',
			'select-info': color === 'info',
			'select-success': color === 'success',
			'select-warning': color === 'warning',
			'select-error': color === 'error',
			'select-ghost': color === 'ghost'
		},
		{
			'select-lg': size === 'lg',
			'select-md': size === 'md',
			'select-sm': size === 'sm',
			'select-xs': size === 'xs'
		},
		{
			'select-bordered': bordered,
			'focus:outline-none': !focusOutline,
			'select-error': error
		}
	);

	return (
		<div className={containerClasses}>
			{label && (
				<label className="label mb-2 p-0">
					<span className="label-text">{label}</span>
				</label>
			)}
			<select {...props} className={selectClasses} id={id} name={name}>
				{options.map((option, index) => (
					<option value={option} key={index}>
						{_.startCase(_.camelCase(_.toString(option)))}
					</option>
				))}
			</select>
			{error && (
				<label className="label mt-2 p-0">
					<span className="label-text-alt text-error">{helperText}</span>
				</label>
			)}
		</div>
	);
};

export default SelectForm;
