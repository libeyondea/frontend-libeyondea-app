import classNames from 'classnames';
import { Fragment } from 'react';

type Props = {
	name: string;
	label: string;
	isError: boolean;
	errorMessage?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input: React.FC<Props> = ({ name, label, isError, errorMessage, ...props }) => {
	return (
		<Fragment>
			<label htmlFor={name} className="inline-block font-medium text-gray-600 mb-1">
				{label}
			</label>
			<div className="relative">
				<input
					{...props}
					className={classNames(
						'rounded-md flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent',
						{
							'focus:ring-red-600 border-red-600': isError
						}
					)}
				/>
			</div>
			{isError && <div className="text-red-700 mt-1 text-sm">{errorMessage}</div>}
		</Fragment>
	);
};

export default Input;
