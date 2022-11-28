import classNames from 'classnames';
import React, { forwardRef } from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
	className?: string;
	space?: string | number;
	children: React.ReactNode;
};

const AvatarGroup = forwardRef(({ className, space = '-1.5rem', children, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
	return (
		<div
			{...props}
			className={classNames('avatar-group', className)}
			style={{
				marginLeft: space
			}}
			ref={ref}
		>
			{children}
		</div>
	);
});

export default AvatarGroup;
