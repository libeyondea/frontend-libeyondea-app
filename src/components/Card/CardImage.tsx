import React, { forwardRef } from 'react';

import Image from '../Image';

export type CardImageProps = {
	className?: string;
	src?: string;
	alt?: string;
} & React.ComponentPropsWithoutRef<'img'>;

const CardImage = forwardRef(({ className, src, alt, ...props }: CardImageProps, ref: React.ForwardedRef<HTMLElement>) => {
	return (
		<figure className={className} ref={ref}>
			<Image {...props} src={src} alt={alt} />
		</figure>
	);
});

export default CardImage;
