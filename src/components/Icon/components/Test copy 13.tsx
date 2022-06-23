type Props = {
	className?: string;
	size?: number | string;
} & React.ComponentPropsWithoutRef<'svg'>;

const IconComponent = ({ className, size = '1em', ...props }: Props) => {
	return (
		<svg
			{...props}
			className={className}
			stroke="currentColor"
			fill="currentColor"
			strokeWidth={0}
			viewBox=""
			height={size}
			width={size}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="" />
		</svg>
	);
};

export default IconComponent;
