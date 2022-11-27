import classNames from 'classnames';
import { forwardRef } from 'react';

import { SyncIcon } from '../Icon';

export type PropsButton = {
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost';
	size?: 'lg' | 'md' | 'sm' | 'xs';
	variant?: 'contain' | 'outline' | 'link';
	shape?: 'circle' | 'square';
	responsive?: boolean;
	fullWidth?: boolean;
	loading?: boolean;
	disabled?: boolean;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<'button'>, 'color'>;

const Button = forwardRef(
	(
		{
			className,
			type = 'button',
			color = 'primary',
			size = 'md',
			variant = 'contain',
			shape,
			responsive = false,
			fullWidth = false,
			loading = false,
			disabled = false,
			startIcon,
			endIcon,
			children,
			...props
		}: PropsButton,
		ref: React.ForwardedRef<HTMLButtonElement>
	) => {
		const classes = classNames(
			'btn',
			{
				'gap-2': (startIcon && !loading) || endIcon
			},
			{
				'btn-primary': color === 'primary',
				'btn-secondary': color === 'secondary',
				'btn-accent': color === 'accent',
				'btn-info': color === 'info',
				'btn-success': color === 'success',
				'btn-warning': color === 'warning',
				'btn-error': color === 'error',
				'btn-ghost': color === 'ghost'
			},
			{
				'btn-lg': size === 'lg',
				'btn-md': size === 'md',
				'btn-sm': size === 'sm',
				'btn-xs': size === 'xs'
			},
			{
				'btn-circle': shape === 'circle',
				'btn-square': shape === 'square'
			},
			{
				'btn-contain': variant === 'contain',
				'btn-outline': variant === 'outline',
				'btn-link': variant === 'link'
			},
			{
				'btn-xs md:btn-sm lg:btn-md xl:btn-lg': responsive,
				'btn-block': fullWidth,
				'btn-disabled': disabled || loading
			},
			className
		);

		return (
			<button {...props} type={type} className={classes} disabled={disabled || loading} ref={ref}>
				{loading ? <SyncIcon className="animate-spin h-4 w-4 mr-2" /> : startIcon && startIcon}
				{children}
				{endIcon && endIcon}
			</button>
		);
	}
);

export default Button;
