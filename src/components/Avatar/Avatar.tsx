import classNames from 'classnames';
import React, { forwardRef } from 'react';

import Image from '../Image';

type Props = {
	className?: string;
	src?: string;
	alt?: string;
	variant?: 'circular' | 'rounded';
	children?: React.ReactNode;
};

const Avatar = forwardRef(({ className, src, alt, variant = 'circular', children, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
	return (
		<div
			className={classNames(
				'relative inline-flex aspect-square h-12 w-12 overflow-hidden object-cover object-center',
				{
					'rounded-full': variant === 'circular',
					'rounded-lg': variant === 'rounded'
				},
				className
			)}
			ref={ref}
			{...props}
		>
			<Image className="h-full w-full object-cover" src={src} alt={alt} />
		</div>
	);
});

export default Avatar;
