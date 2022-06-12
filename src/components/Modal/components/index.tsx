import classNames from 'classnames';
import ButtonComponent from 'components/Button/components';
import CardComponent from 'components/Card/components';
import useOnClickOutside from 'hooks/useClickOutside';
import useLockedScroll from 'hooks/useLockedScroll';
import { useRef } from 'react';
import { FaCheck, FaExclamation, FaExclamationTriangle } from 'react-icons/fa';

type Props = {
	className?: string;
	title: string;
	content?: string;
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	onClick?: () => void;
	styleType?: 'success' | 'warning' | 'danger';
};

const ModalComponent: React.FC<Props> = ({ className, title, content, show, setShow, onClick, styleType = 'success' }) => {
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
						<div
							className={classNames('mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full sm:mx-0', {
								'bg-green-100': styleType === 'success',
								'bg-orange-100': styleType === 'warning',
								'bg-red-100': styleType === 'danger'
							})}
						>
							{styleType === 'success' && <FaCheck className="h-4 w-4 text-green-600" />}
							{styleType === 'warning' && <FaExclamation className="h-4 w-4 text-orange-600" />}
							{styleType === 'danger' && <FaExclamationTriangle className="h-4 w-4 text-red-600" />}
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
					<div className="sm:flex sm:flex-row-reverse mt-4">
						<ButtonComponent className="w-full sm:w-auto sm:ml-3" styleType={styleType} onClick={onClick ? onClick : () => setShow(false)}>
							OK
						</ButtonComponent>
						<ButtonComponent className="w-full sm:w-auto mt-3 sm:mt-0" styleType="default" onClick={() => setShow(false)}>
							Cancel
						</ButtonComponent>
					</div>
				</CardComponent>
			</div>
		</div>
	) : null;
};

export default ModalComponent;
