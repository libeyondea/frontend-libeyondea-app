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

	return (
		<div className={classNames('w-full', className)}>
			{label && (
				<label htmlFor={id} className="mb-1 inline-block font-medium text-gray-600">
					{label}
				</label>
			)}
			<select
				{...props}
				className={classNames(
					'w-full rounded-lg border border-blue-400 px-3 py-2.5 text-sm placeholder-slate-400 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:border-0 disabled:bg-blue-100 disabled:opacity-50',
					{
						'border-red-400 focus:border-red-400 focus:ring-red-300': error
					}
				)}
				id={id}
				name={name}
			>
				{options.map((option, index) => (
					<option value={option} key={index}>
						{_.startCase(_.camelCase(_.toString(option)))}
					</option>
				))}
			</select>
			{error && <div className="mt-1 text-sm text-red-500">{helperText}</div>}
		</div>
	);
};

export default SelectForm;
