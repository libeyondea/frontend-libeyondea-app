import classNames from 'classnames';

type Props = {
	className?: string;
	colorType?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'danger' | 'ghost' | 'dark';
	sizeType?: 'lg' | 'md' | 'sm' | 'xs';
	children: React.ReactNode;
};

const Badge = ({ className, colorType = 'primary', sizeType = 'md', children }: Props) => (
	<div
		className={classNames(
			'badge',
			{
				'badge-primary': colorType === 'primary',
				'badge-secondary': colorType === 'secondary',
				'badge-accent': colorType === 'accent',
				'badge-info': colorType === 'info',
				'badge-success': colorType === 'success',
				'badge-warning': colorType === 'warning',
				'badge-error': colorType === 'danger',
				'badge-ghost': colorType === 'ghost',
				'': colorType === 'dark'
			},
			{
				'badge-lg': sizeType === 'lg',
				'badge-md': sizeType === 'md',
				'badge-sm': sizeType === 'sm',
				'badge-xs': sizeType === 'xs'
			},
			className
		)}
	>
		{children}
	</div>
);

export default Badge;
