import classNames from 'classnames';
import React from 'react';

type Props = {
	className?: string;
	children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<'label'>, 'color'>;

const DropdownToggle = ({ className, children, ...props }: Props) => {
	return (
		<label {...props} tabIndex={0} className={classNames('inline-flex', className)}>
			{children}
		</label>
	);
};

export default DropdownToggle;
