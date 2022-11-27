import classNames from 'classnames';
import _ from 'lodash';
import React, { forwardRef } from 'react';

import StatItem from './StatItem';

export type StatProps = {
	className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const Stat = forwardRef(({ className, ...props }: StatProps, ref: React.ForwardedRef<HTMLDivElement>) => {
	const classes = classNames('stat', className);

	return <div {...props} className={classes} ref={ref} />;
});

export default _.assign(Stat, {
	Item: StatItem
});
