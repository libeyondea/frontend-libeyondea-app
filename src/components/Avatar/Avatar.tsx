import classNames from 'classnames';
import _ from 'lodash';
import React, { forwardRef } from 'react';

import Image from '../Image';
import AvatarGroup from './AvatarGroup';

type Props = {
	className?: string;
	src?: string;
	alt?: string;
	placeholder?: string;
	size?: string | number;
	online?: boolean;
	offline?: boolean;
	children?: React.ReactNode;
};

const Avatar = forwardRef(
	(
		{ className, src, alt, placeholder, size = '3rem', online = false, offline = false, children, ...props }: Props,
		ref: React.ForwardedRef<HTMLDivElement>
	) => {
		const containerClasses = classNames(
			'avatar',
			{
				placeholder: !src,
				online: online,
				offline: offline
			},
			className
		);

		return (
			<div {...props} className={containerClasses} ref={ref}>
				{src ? (
					<div
						className="rounded-full"
						style={{
							width: size,
							height: size
						}}
					>
						<Image src={src} alt={alt} />
					</div>
				) : (
					<div
						className="rounded-full"
						style={{
							width: size,
							height: size
						}}
					>
						{placeholder || children}
					</div>
				)}
			</div>
		);
	}
);

export default _.assign(Avatar, {
	Group: AvatarGroup
});
