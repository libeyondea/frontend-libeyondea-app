import classNames from 'classnames';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'tbody'>;

const TbodyTableComponent = ({ className, children, ...props }: Props) => {
	return (
		<tbody {...props} className={classNames('bg-white divide-y divide-gray-200', className)}>
			{children}
		</tbody>
	);
};

export default TbodyTableComponent;
