import classNames from 'classnames';
import _ from 'lodash';
import React, { forwardRef } from 'react';

import CardActions from './CardActions';
import CardBody from './CardBody';
import CardContent from './CardContent';
import CardTitle from './CardTitle';

type Props = {
	className?: string;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

const Card = forwardRef(({ className, children, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
	return (
		<div {...props} className={classNames('relative flex w-full flex-col rounded-md bg-white shadow-lg', className)} ref={ref}>
			{children}
		</div>
	);
});

export default _.assign(Card, {
	Body: CardBody,
	Title: CardTitle,
	Content: CardContent,
	Actions: CardActions
});
