import classNames from 'classnames';
import React, { forwardRef } from 'react';

import Image from '../Image';
import AvatarGroup from './AvatarGroup';

type Props = {
	className?: string;
	src?: string;
	alt?: string;
	placeholder?: string;
	size?: number;
	online?: boolean;
} & React.ComponentPropsWithRef<'div'>;

const Avatar = Object.assign(
	forwardRef<HTMLDivElement, Props>(({ className, src, alt, placeholder, size = 3, online = false, children, ...props }, ref) => {
		const classes = classNames(
			'avatar',
			online ? 'avatar-online' : 'avatar-offline',
			{
				'avatar-placeholder': !src
			},
			className
		);

		const avatarSize = `${size}rem`;

		return (
			<div {...props} className={classes} ref={ref}>
				<div className="rounded-full" style={{ width: avatarSize, height: avatarSize }}>
					{src ? <Image src={src} alt={alt} /> : placeholder || children}
				</div>
			</div>
		);
	}),
	{ Group: AvatarGroup }
);

export default Avatar;
