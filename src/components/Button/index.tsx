import classNames from 'classnames';

import { SyncIcon } from '../Icon';

type Props = {
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	loading?: boolean;
	disabled?: boolean;
	colorType?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'danger' | 'ghost' | 'dark';
	sizeType?: 'lg' | 'md' | 'sm' | 'xs';
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'button'>;

const Button = ({ className, type = 'button', loading = false, disabled = false, colorType = 'primary', sizeType = 'md', children, ...props }: Props) => (
	<button
		{...props}
		type={type}
		className={classNames(
			'btn',
			{
				'btn-primary': colorType === 'primary',
				'btn-secondary': colorType === 'secondary',
				'btn-accent': colorType === 'accent',
				'btn-info': colorType === 'info',
				'btn-success': colorType === 'success',
				'btn-warning': colorType === 'warning',
				'btn-error': colorType === 'danger',
				'btn-ghost': colorType === 'ghost',
				'': colorType === 'dark'
			},
			{
				'btn-lg': sizeType === 'lg',
				'btn-md': sizeType === 'md',
				'btn-sm': sizeType === 'sm',
				'btn-xs': sizeType === 'xs'
			},
			className
		)}
		disabled={disabled || loading}
	>
		{loading && <SyncIcon className="animate-spin h-4 w-4 mr-2" />}
		{children}
	</button>
);

export default Button;
