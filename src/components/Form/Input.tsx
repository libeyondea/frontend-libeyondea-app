import classNames from 'classnames';
import { useId } from 'react';

type Props = {
	className?: string;
	name: string;
	type?: 'text' | 'password';
	label?: string;
	error?: boolean;
	helperText?: string;
} & React.ComponentPropsWithoutRef<'input'>;

const InputForm = ({ className, name, type = 'text', label, error = false, helperText, ...props }: Props) => {
	const id = useId();

	return (
		<div className={classNames('w-full', className)}>
			{label && (
				<label htmlFor={id} className="mb-1 inline-block font-medium text-gray-600">
					{label}
				</label>
			)}
			<input
				{...props}
				className={classNames(
					'w-full rounded-lg border border-blue-400 px-3 py-2.5 text-sm placeholder-slate-400 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:border-0 disabled:bg-blue-100 disabled:opacity-50',
					{
						'border-red-400 focus:border-red-400 focus:ring-red-300': error
					}
				)}
				id={id}
				name={name}
				type={type}
				placeholder={label}
			/>
			{error && <div className="mt-1 text-sm text-red-500">{helperText}</div>}
		</div>
	);
};

export default InputForm;
