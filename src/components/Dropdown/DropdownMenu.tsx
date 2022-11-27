import classNames from 'classnames';
import React from 'react';

type Props = {
	className?: string;
	children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'ul'>;

const DropdownMenu = ({ className, children, ...props }: Props) => {
	const classes = classNames('dropdown-content menu mt-4 p-2 shadow bg-base-100 rounded-box w-52', className);

	return (
		<ul {...props} tabIndex={0} className={classes}>
			{children}
		</ul>
	);
};

export default DropdownMenu;
