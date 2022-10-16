import classNames from 'classnames';
import _ from 'lodash';
import { useId } from 'react';

type Props = {
	className?: string;
	name: string;
	label?: string;
	options: string[] | number[];
	error?: boolean;
	helperText?: string;
	sizeType?: 'lg' | 'md' | 'sm' | 'xs';
} & React.ComponentPropsWithoutRef<'select'>;

const SelectForm = ({ className, name, label, options, error = false, helperText, sizeType = 'md', ...props }: Props) => {
	const id = useId();

	return (
		<div className={classNames('form-control w-full', className)}>
			{label && (
				<label className="label p-0 mb-2">
					<span className="label-text">{label}</span>
				</label>
			)}
			<select
				{...props}
				id={id}
				name={name}
				className={classNames(
					'select select-bordered select-primary w-full',
					{
						'select-lg': sizeType === 'lg',
						'select-md': sizeType === 'md',
						'select-sm': sizeType === 'sm',
						'select-xs': sizeType === 'xs'
					},
					{
						'select-error': error
					}
				)}
			>
				{options.map((option, index) => (
					<option value={option} key={index}>
						{_.startCase(_.camelCase(option.toString()))}
					</option>
				))}
			</select>
			{error && (
				<label className="label p-0 mt-2">
					<span className="label-text-alt text-error">{helperText}</span>
				</label>
			)}
		</div>
	);
};

export default SelectForm;
