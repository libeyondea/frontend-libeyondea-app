import classNames from 'classnames';
import React, { forwardRef } from 'react';

type Props = React.HTMLAttributes<HTMLDivElement> & {
	className?: string;
	space?: number;
} & React.ComponentPropsWithRef<'div'>;

const AvatarGroup = forwardRef<HTMLDivElement, Props>(({ className, space = -1.5, children, ...props }, ref) => {
	const avatarGroupSpace = `${space}rem`;

	return (
		<div
			{...props}
			className={classNames('avatar-group', className)}
			style={{
				marginLeft: avatarGroupSpace
			}}
			ref={ref}
		>
			{children}
		</div>
	);
});

export default AvatarGroup;
