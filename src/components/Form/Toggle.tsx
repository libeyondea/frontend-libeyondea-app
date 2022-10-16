import classNames from 'classnames';
import { useId } from 'react';

type Props = {
	className?: string;
	name: string;
	label?: string;
	error?: boolean;
	helperText?: string;
	sizeType?: 'lg' | 'md' | 'sm' | 'xs';
} & React.ComponentPropsWithoutRef<'input'>;

const ToggleForm = ({ className, name, label, error = false, helperText, sizeType = 'md', ...props }: Props) => {
	const id = useId();

	return (
		<div className={classNames('form-control', className)}>
			{label && (
				<label className="label p-0 mb-2">
					<span className="label-text">{label}</span>
				</label>
			)}
			<input
				{...props}
				id={id}
				name={name}
				className={classNames('toggle', {
					'toggle-lg': sizeType === 'lg',
					'toggle-md': sizeType === 'md',
					'toggle-sm': sizeType === 'sm',
					'toggle-xs': sizeType === 'xs'
				})}
				type="checkbox"
			/>
			{error && (
				<label className="label p-0 mt-2">
					<span className="label-text-alt text-error">{helperText}</span>
				</label>
			)}
		</div>
	);
};

export default ToggleForm;
