import React from 'react';

import Button from '../Button';

type Props = {
	color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost';
	size?: 'lg' | 'md' | 'sm' | 'xs';
	shape?: 'circle' | 'square';
	variant?: 'outline' | 'link';
	disabled?: boolean;
	button?: boolean;
	children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<'label'>, 'color'>;

const DropdownToggle = ({ className, color, size, shape, variant, disabled = false, button = true, children, ...props }: Props) => {
	return (
		<label {...props} tabIndex={0} className={className}>
			{button ? (
				<Button color={color} size={size} shape={shape} variant={variant} disabled={disabled}>
					{children}
				</Button>
			) : (
				children
			)}
		</label>
	);
};

export default DropdownToggle;
