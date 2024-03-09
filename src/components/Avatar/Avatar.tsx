import classNames from 'classnames';
import React, { forwardRef } from 'react';

import Image from '../Image';

type Props = {
	className?: string;
	src?: string;
	alt?: string;
	children?: React.ReactNode;
};

const Avatar = forwardRef(({ className, src, alt, children, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
	return (
		<div
			{...props}
			className={classNames('relative inline-flex aspect-square h-12 w-12 overflow-hidden rounded-full object-cover object-center', className)}
			ref={ref}
		>
			<Image className="h-full w-full object-cover" src={src} alt={alt} />
		</div>
	);
});

export default Avatar;
