import classNames from 'classnames';
import { forwardRef } from 'react';
import { FaTimes } from 'react-icons/fa';

type Props = {
	className?: string;
	title?: string;
	onClickClose?: () => void;
	children: React.ReactNode;
};

const CardComponent = forwardRef<HTMLDivElement, Props>(({ className, title, onClickClose, children }, ref) => {
	return (
		<div className={classNames('shadow-lg rounded-md p-4 bg-white w-full', className)} ref={ref}>
			{title && (
				<div className="flex mb-4">
					<h3 className="flex items-center font-bold text-lg text-gray-900">{title}</h3>
					{onClickClose && (
						<div className="ml-auto -mt-1">
							<button type="button" onClick={onClickClose} className="flex items-center bg-white hover:bg-gray-300 p-1 rounded-md">
								<FaTimes className="w-6 h-6 text-gray-700" />
							</button>
						</div>
					)}
				</div>
			)}
			<div className="w-full">{children}</div>
		</div>
	);
});

export default CardComponent;
