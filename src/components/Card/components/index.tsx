import classNames from 'classnames';
import { forwardRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type Props = {
	className?: string;
	header?: string;
	redirectCloseUrl?: string;
	children: React.ReactNode;
};

const CardComponent = forwardRef<HTMLDivElement, Props>(({ className, header, redirectCloseUrl, children }, ref) => {
	const navigate = useNavigate();

	return (
		<div className={classNames('shadow-lg rounded-md p-4 bg-white w-full', className)} ref={ref}>
			{header && (
				<div
					className={classNames('flex mb-4', {
						'-mt-1': redirectCloseUrl
					})}
				>
					<h3 className="flex items-center font-bold text-lg text-black">{header}</h3>
					{redirectCloseUrl && (
						<div className="ml-auto">
							<button type="button" onClick={() => navigate(redirectCloseUrl)} className="flex items-center bg-white hover:bg-gray-300 p-1 rounded-md">
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
