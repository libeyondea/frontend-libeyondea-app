import classNames from 'classnames';
import _ from 'lodash';
import React, { forwardRef } from 'react';

import CardActions from './CardActions';
import CardBody from './CardBody';
import CardContent from './CardContent';
import CardImage from './CardImage';
import CardTitle from './CardTitle';

type Props = {
	className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const Card = forwardRef(({ className, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
	const classes = classNames('card bg-base-100 shadow-md w-full', className);

	return <div {...props} className={classes} ref={ref} />;
});

export default _.assign(Card, {
	Image: CardImage,
	Body: CardBody,
	Title: CardTitle,
	Content: CardContent,
	Actions: CardActions
});
