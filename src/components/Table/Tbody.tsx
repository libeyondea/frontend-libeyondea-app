import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'tbody'>;

const TbodyTable = ({ className, children, ...props }: Props) => {
	return (
		<tbody {...props} className={classNames('', className)}>
			{children}
		</tbody>
	);
};

export default TbodyTable;
