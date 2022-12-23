import classNames from 'classnames';
import { forwardRef } from 'react';

import { SyncIcon } from '../Icon';

type Props = {
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
	variant?: 'filled' | 'outlined' | 'text';
	loading?: boolean;
	disabled?: boolean;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<'button'>, 'color'>;

const Button = forwardRef(
	(
		{ className, type = 'button', color = 'primary', variant = 'filled', loading = false, disabled = false, startIcon, endIcon, children, ...props }: Props,
		ref: React.ForwardedRef<HTMLButtonElement>
	) => {
		return (
			<button
				{...props}
				className={classNames(
					'inline-flex items-center justify-center rounded-lg py-3 px-6 text-sm font-bold transition-all focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
					{
						'gap-2': (startIcon && !loading) || endIcon
					},
					{
						'bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] active:opacity-[0.85]':
							color === 'primary' && variant === 'filled',
						'bg-slate-500 text-white shadow-md shadow-slate-500/20 hover:shadow-lg hover:shadow-slate-500/40 focus:opacity-[0.85] active:opacity-[0.85]':
							color === 'secondary' && variant === 'filled',
						'bg-green-500 text-white shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] active:opacity-[0.85]':
							color === 'success' && variant === 'filled',
						'bg-cyan-500 text-white shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/40 focus:opacity-[0.85] active:opacity-[0.85]':
							color === 'info' && variant === 'filled',
						'bg-amber-500 text-white shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] active:opacity-[0.85]':
							color === 'warning' && variant === 'filled',
						'bg-red-500 text-white shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] active:opacity-[0.85]':
							color === 'danger' && variant === 'filled'
					},
					{
						'border border-blue-500 text-blue-500 hover:bg-blue-500/10 focus:ring focus:ring-blue-200 active:bg-blue-500/30':
							color === 'primary' && variant === 'outlined',
						'border border-slate-500 text-slate-500 hover:bg-slate-500/10 focus:ring focus:ring-slate-200 active:bg-slate-500/30':
							color === 'secondary' && variant === 'outlined',
						'border border-green-500 text-green-500 hover:bg-green-500/10 focus:ring focus:ring-green-200 active:bg-green-500/30':
							color === 'success' && variant === 'outlined',
						'border border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 focus:ring focus:ring-cyan-200 active:bg-cyan-500/30':
							color === 'info' && variant === 'outlined',
						'border border-amber-500 text-amber-500 hover:bg-amber-500/10 focus:ring focus:ring-amber-200 active:bg-amber-500/30':
							color === 'warning' && variant === 'outlined',
						'border border-red-500 text-red-500 hover:bg-red-500/10 focus:ring focus:ring-red-200 active:bg-red-500/30':
							color === 'danger' && variant === 'outlined'
					},
					{
						'text-blue-500 hover:bg-blue-500/10 active:bg-blue-500/30': color === 'primary' && variant === 'text',
						'text-slate-500 hover:bg-slate-500/10 active:bg-slate-500/30': color === 'secondary' && variant === 'text',
						'text-green-500 hover:bg-green-500/10 active:bg-green-500/30': color === 'success' && variant === 'text',
						'text-cyan-500 hover:bg-cyan-500/10 active:bg-cyan-500/30': color === 'info' && variant === 'text',
						'text-amber-500 hover:bg-amber-500/10 active:bg-amber-500/30': color === 'warning' && variant === 'text',
						'text-red-500 hover:bg-red-500/10 active:bg-red-500/30': color === 'danger' && variant === 'text'
					},
					className
				)}
				type={type}
				disabled={disabled || loading}
				ref={ref}
			>
				{loading ? <SyncIcon className="mr-2 h-4 w-4 animate-spin" /> : startIcon && startIcon}
				{children}
				{endIcon && endIcon}
			</button>
		);
	}
);

export default Button;
