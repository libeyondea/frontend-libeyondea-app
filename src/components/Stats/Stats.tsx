import classNames from 'classnames';
import _ from 'lodash';
import React, { forwardRef } from 'react';

import Stat from './Stat';

type Props = {
	className?: string;
	vertical?: boolean;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

const Stats = _.assign(
	forwardRef(({ className, vertical = false, children, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
		const classes = classNames('stats bg-base-100 w-full shadow-md', vertical ? 'stats-vertical' : 'stats-horizontal', className);

		return (
			<div {...props} className={classes} ref={ref}>
				{children}
			</div>
		);
	}),
	{
		Stat: Stat
	}
);

export default Stats;
