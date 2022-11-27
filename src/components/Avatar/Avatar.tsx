import classNames from 'classnames';
import _ from 'lodash';
import React, { forwardRef } from 'react';

import Image from '../Image';
import AvatarGroup from './AvatarGroup';

export type AvatarProps = {
	className?: string;
	src?: string;
	alt?: string;
	placeholder?: string;
	size?: string | number;
	shape?: 'circle' | 'square';
	online?: boolean;
	offline?: boolean;
	children?: React.ReactNode;
};

const Avatar = forwardRef(
	(
		{ className, src, alt, placeholder, size = '3rem', shape = 'circle', online = false, offline = false, children, ...props }: AvatarProps,
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

		const imageClasses = classNames({
			'rounded-full': shape === 'circle',
			'rounded-btn': shape === 'square'
		});

		const placeholderClasses = classNames({
			'rounded-full': shape === 'circle',
			'rounded-btn': shape === 'square'
		});

		const styles = {
			width: size,
			height: size
		};

		return (
			<div {...props} className={containerClasses} ref={ref}>
				{src ? (
					<div className={imageClasses} style={styles}>
						<Image src={src} alt={alt} />
					</div>
				) : placeholder ? (
					<div className={placeholderClasses} style={styles}>
						{placeholder}
					</div>
				) : (
					<div className={imageClasses} style={styles}>
						{children}
					</div>
				)}
			</div>
		);
	}
);

export default _.assign(Avatar, {
	Group: AvatarGroup
});
