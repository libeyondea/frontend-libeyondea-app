import classNames from 'classnames';
import _ from 'lodash';
import React, { forwardRef } from 'react';

import StatItem from './StatItem';

type Props = {
	className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const Stat = forwardRef(({ className, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
	return <div {...props} className={classNames('stat', className)} ref={ref} />;
});

export default _.assign(Stat, {
	Item: StatItem
});
