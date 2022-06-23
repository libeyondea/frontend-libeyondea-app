import classNames from 'classnames';

type Props = {
	className?: string;
	styleType?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
	children: React.ReactNode;
};

const BadgeComponent = ({ className, styleType = 'primary', children }: Props) => (
	<div
		className={classNames(
			'px-2 py-1 inline-flex items-center justify-centers text-sm leading-none font-semibold rounded-full',
			{
				'bg-purple-600 text-white': styleType === 'primary',
				'bg-gray-600 text-white': styleType === 'secondary',
				'bg-green-600 text-white': styleType === 'success',
				'bg-red-600 text-white': styleType === 'danger',
				'bg-yellow-600 text-gray-900': styleType === 'warning',
				'bg-cyan-600 text-gray-900': styleType === 'info',
				'bg-gray-900 text-white': styleType === 'dark',
				'bg-gray-100 text-gray-900': styleType === 'light'
			},
			className
		)}
	>
		{children}
	</div>
);

export default BadgeComponent;
