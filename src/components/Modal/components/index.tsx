import classNames from 'classnames';
import CardComponent from 'components/Card/components';
import useOnClickOutside from 'hooks/useClickOutside';
import useLockedScroll from 'hooks/useLockedScroll';
import { useRef } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

type Props = {
	className?: string;
	title: string;
	content?: string;
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	onClick?: () => void;
};

const ModalComponent: React.FC<Props> = ({ className, title, content, show, setShow, onClick }) => {
	const outsideRef = useRef(null);

	useOnClickOutside(outsideRef, () => {
		setShow(false);
	});

	useLockedScroll(show);

	return show ? (
		<div className="h-full w-full fixed overflow-x-hidden overflow-y-auto z-50 top-0 left-0">
			<div className="min-h-full flex items-center py-8 sm:px-16 bg-gray-900/50 z-40 justify-center">
				<CardComponent ref={outsideRef} className={classNames('sm:max-w-lg z-50', className)}>
					<div className="sm:flex sm:items-center">
						<div className="mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-100 sm:mx-0">
							<FaExclamationTriangle className="h-4 w-4 text-red-600" aria-hidden="true" />
						</div>
						<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
						</div>
					</div>
					{content && (
						<div className="mt-2">
							<p className="text-sm text-gray-500 text-center">{content}</p>
						</div>
					)}
					<div className="bg-gray-50 sm:flex sm:flex-row-reverse mt-4">
						<button
							type="button"
							className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
							onClick={onClick}
						>
							OK
						</button>
						<button
							type="button"
							className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							onClick={() => setShow(false)}
						>
							Cancel
						</button>
					</div>
				</CardComponent>
			</div>
		</div>
	) : null;
};

export default ModalComponent;
