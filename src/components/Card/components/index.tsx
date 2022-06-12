import classNames from 'classnames';
import { forwardRef } from 'react';
import { FaTimes } from 'react-icons/fa';

type Props = {
	className?: string;
	header?: string;
	onClickClose?: () => void;
	children: React.ReactNode;
};

const CardComponent = forwardRef<HTMLDivElement, Props>(({ className, header, onClickClose, children }, ref) => {
	return (
		<div className={classNames('shadow-lg rounded-md p-4 bg-white w-full', className)} ref={ref}>
			{header && (
				<div className="flex mb-4">
					<h3 className="flex items-center font-bold text-lg text-black">{header}</h3>
					{onClickClose && (
						<div className="ml-auto -mt-1">
							<button type="button" onClick={onClickClose} className="flex items-center bg-white hover:bg-gray-300 p-1 rounded-md">
								<FaTimes className="w-6 h-6" />
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
