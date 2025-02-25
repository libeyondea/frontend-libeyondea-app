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
	offline?: boolean;
	children?: React.ReactNode;
};

const Avatar = Object.assign(
	forwardRef<HTMLDivElement, Props>(({ className, src, alt, placeholder, size = 3, online = false, offline = false, children, ...props }, ref) => {
		const avatarSize = `${size}rem`;

		return (
			<div
				{...props}
				className={classNames(
					'avatar',
					{
						'avatar-placeholder': !src,
						'avatar-online': online,
						'avatar-offline': offline
					},
					className
				)}
				ref={ref}
			>
				<div className="rounded-full" style={{ width: avatarSize, height: avatarSize }}>
					{src ? <Image src={src} alt={alt} /> : placeholder || children}
				</div>
			</div>
		);
	}),
	{ Group: AvatarGroup }
);

export default Avatar;
