import classNames from 'classnames';
import React, { forwardRef } from 'react';

import { AvatarProps } from './Avatar';

export type AvatarGroupProps = React.HTMLAttributes<HTMLDivElement> & {
	className?: string;
	space?: string | number;
	children: React.ReactElement<AvatarProps> | React.ReactElement<AvatarProps>[];
};

const AvatarGroup = forwardRef(({ className, space = '-1.5rem', children, ...props }: AvatarGroupProps, ref: React.ForwardedRef<HTMLDivElement>) => {
	const classes = classNames('avatar-group', className);

	const styles = {
		marginLeft: space
	};

	return (
		<div {...props} className={classes} style={styles} ref={ref}>
			{children}
		</div>
	);
});

export default AvatarGroup;
