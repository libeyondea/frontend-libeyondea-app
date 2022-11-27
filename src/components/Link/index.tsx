import classNames from 'classnames';
import { forwardRef } from 'react';
import { Link as ReactLink, To } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

type Props = {
	className?: string;
	to: To;
	color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral';
	hover?: boolean;
	children: React.ReactNode;
} & LinkProps;

const Link = ({ className, to, color = 'primary', hover = true, children, ...props }: Props, ref: React.ForwardedRef<HTMLAnchorElement>) => (
	<ReactLink
		{...props}
		className={classNames(
			'link',
			{
				[`link-${color}`]: color,
				'link-hover': hover
			},
			className
		)}
		to={to}
		ref={ref}
	>
		{children}
	</ReactLink>
);

export default forwardRef(Link);
