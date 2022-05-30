import classNames from 'classnames';

type Props = {
	className?: string;
	classNameInput?: string;
	name: string;
	label?: string;
	isError?: boolean;
	errorMessage?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = ({ className, classNameInput, name, label, isError = false, errorMessage, ...props }) => {
	return (
		<div className={classNames('', className)}>
			{label && (
				<label htmlFor={name} className="inline-block font-medium text-gray-600 mb-1">
					{label}
				</label>
			)}
			<div className="relative">
				<input
					{...props}
					name={name}
					className={classNames(
						'rounded-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent',
						{
							'focus:ring-red-600 border-red-600': isError
						},
						classNameInput
					)}
				/>
			</div>
			{isError && <div className="text-red-700 mt-1 text-sm">{errorMessage}</div>}
		</div>
	);
};

export default Input;
