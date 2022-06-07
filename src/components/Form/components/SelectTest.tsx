import classNames from 'classnames';
import { Listbox, Transition } from '@headlessui/react';
import { FaCheck, FaChevronDown } from 'react-icons/fa';
import { Fragment, useState } from 'react';
import * as userConstant from 'constants/user';

type OnChange = (field: string, value: string, shouldValidate?: boolean) => void;

type Props = {
	className?: string;
	classNameInput?: string;
	options: Array<{ value: any; label: any }>;
	value: string;
	name: string;
	label?: string;
	isHorizontal?: boolean;
	isError?: boolean;
	errorMessage?: string;
	onChange: OnChange;
};

const SelectTestFormComponent: React.FC<Props> = ({
	className,
	classNameInput,
	name,
	value,
	label,
	isHorizontal = false,
	isError = false,
	errorMessage,
	options,
	onChange,
	...props
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(options[0]);

	const toggling = () => setIsOpen(!isOpen);

	const onOptionClicked = (value: { value: any; label: any }) => () => {
		setSelectedOption(value);
		setIsOpen(false);
	};

	return (
		<div
			className={classNames(
				'',
				{
					'flex items-center': isHorizontal
				},
				className
			)}
		>
			{label && (
				<label
					htmlFor={name}
					className={classNames('inline-block font-medium text-gray-600', {
						'mr-1': isHorizontal,
						'mb-1': !isHorizontal
					})}
				>
					{label}
				</label>
			)}
			{/* <Listbox value={selected} onChange={setSelected}> */}
			<div className="relative">
				<button
					type="button"
					className="relative border border-gray-300 w-full cursor-default rounded-md bg-white py-2 pl-4 pr-8 text-gray-700 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-base focus:ring-2 focus:ring-purple-600 focus:border-transparent"
					onClick={toggling}
				>
					<span className="block truncate">{selectedOption.label}</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<FaChevronDown className="h-4 w-4 text-gray-400" />
					</span>
				</button>
				{/* <Transition show={isOpen} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0"> */}
				{isOpen && (
					<ul className="absolute mt-2 max-h-40 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						{options.map((option, index) => (
							<li
								key={index}
								className={`relative cursor-default select-none py-2 pl-10 pr-4 ${
									option.value === selectedOption.value ? 'bg-gray-300 text-gray-700' : 'text-gray-900'
								}`}
								onClick={onOptionClicked(option)}
							>
								<span className={`block truncate ${option.value === selectedOption.value ? 'font-medium' : 'font-normal'}`}>{option.label}</span>
								{option.value === selectedOption.value ? (
									<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
										<FaCheck className="h-4 w-4" />
									</span>
								) : null}
							</li>
						))}
					</ul>
				)}
				{/* </Transition> */}
			</div>
			{/* </Listbox> */}
			{isError && <div className="text-red-700 mt-1 text-sm">{errorMessage}</div>}
		</div>
	);
};

export default SelectTestFormComponent;
