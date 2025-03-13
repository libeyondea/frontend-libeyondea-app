import classNames from 'classnames';
import { forwardRef } from 'react';

import { SyncIcon } from '../Icon';

type Props = {
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
	size?: 'lg' | 'md' | 'sm' | 'xs';
	variant?: 'outline' | 'dash' | 'soft' | 'ghost' | 'link';
	responsive?: boolean;
	loading?: boolean;
	disabled?: boolean;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
} & React.ComponentPropsWithRef<'button'>;

const Button = forwardRef<HTMLButtonElement, Props>(
	(
		{
			className,
			type = 'button',
			color = 'primary',
			size = 'md',
			variant,
			responsive = true,
			loading = false,
			disabled = false,
			startIcon,
			endIcon,
			children,
			...props
		}: Props,
		ref
	) => {
		const classes = classNames(
			'btn',
			`btn-${color}`,
			`btn-${size}`,
			variant && `btn-${variant}`,
			{
				'gap-2': (startIcon && !loading) || endIcon,
				'btn-disabled': disabled || loading,
				'btn-xs md:btn-sm lg:btn-md xl:btn-lg': responsive
			},
			className
		);

		return (
			<button {...props} className={classes} type={type} disabled={disabled || loading} ref={ref}>
				{loading ? <SyncIcon className="mr-2 h-4 w-4 animate-spin" /> : startIcon}
				{children}
				{endIcon}
			</button>
		);
	}
);

export default Button;
