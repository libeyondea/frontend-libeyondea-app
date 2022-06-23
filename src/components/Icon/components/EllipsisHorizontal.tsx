type Props = {
	className?: string;
	size?: number | string;
} & React.ComponentPropsWithoutRef<'svg'>;

const EllipsisHorizontalIconComponent = ({ className, size = '1em', ...props }: Props) => {
	return (
		<svg
			{...props}
			className={className}
			stroke="currentColor"
			fill="currentColor"
			strokeWidth={0}
			viewBox="0 0 512 512"
			height={size}
			width={size}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" />
		</svg>
	);
};

export default EllipsisHorizontalIconComponent;
