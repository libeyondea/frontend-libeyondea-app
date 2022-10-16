import classNames from 'classnames';
import { useId } from 'react';

type Props = {
	className?: string;
	name: string;
	type?: 'text' | 'password';
	label?: string;
	error?: boolean;
	helperText?: string;
	sizeType?: 'lg' | 'md' | 'sm' | 'xs';
} & React.ComponentPropsWithoutRef<'input'>;

const InputForm = ({ className, type = 'text', name, label, error = false, helperText, sizeType = 'md', ...props }: Props) => {
	const id = useId();

	return (
		<div className={classNames('form-control w-full', className)}>
			{label && (
				<label className="label p-0 mb-2">
					<span className="label-text">{label}</span>
				</label>
			)}
			<input
				{...props}
				id={id}
				name={name}
				placeholder={label}
				className={classNames(
					'input input-bordered w-full',
					{
						'input-lg': sizeType === 'lg',
						'input-md': sizeType === 'md',
						'input-sm': sizeType === 'sm',
						'input-xs': sizeType === 'xs'
					},
					{
						'input-error': error
					}
				)}
				type={type}
			/>
			{error && (
				<label className="label p-0 mt-2">
					<span className="label-text-alt text-error">{helperText}</span>
				</label>
			)}
		</div>
	);
};

export default InputForm;
