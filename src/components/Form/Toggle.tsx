import classNames from 'classnames';
import { useId } from 'react';

type Props = {
	className?: string;
	name: string;
	label?: string;
	error?: boolean;
	helperText?: string;
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'color' | 'size'>;

const ToggleForm = ({ className, name, label, error = false, helperText, ...props }: Props) => {
	const id = useId();

	return (
		<div className={classNames('w-full', className)}>
			{label && (
				<label htmlFor={id} className="mb-1 inline-block font-medium text-gray-600">
					{label}
				</label>
			)}
			<div className="flex">
				<label htmlFor={id} className="relative inline-flex cursor-pointer items-center">
					<input {...props} className="peer sr-only" id={id} name={name} type="checkbox" />
					<div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring peer-focus:ring-blue-300 peer-focus:ring-opacity-50"></div>
				</label>
			</div>
			{error && <div className="mt-1 text-sm text-red-500">{helperText}</div>}
		</div>
	);
};

export default ToggleForm;
