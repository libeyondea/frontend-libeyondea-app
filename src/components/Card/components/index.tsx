import classNames from 'classnames';

type Props = {
	className?: string;
	header?: string;
	children: React.ReactNode;
};

const CardComponent: React.FC<Props> = ({ className, header, children }) => {
	return (
		<div className={classNames('shadow-lg rounded-md p-4 bg-white w-full', className)}>
			{header && (
				<div className="mb-4">
					<h3 className="font-bold text-lg text-black">{header}</h3>
				</div>
			)}
			<div className="w-full">{children}</div>
		</div>
	);
};

export default CardComponent;
