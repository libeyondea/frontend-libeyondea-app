type Props = {
	className?: string;
	size?: number | string;
} & React.ComponentPropsWithoutRef<'svg'>;

const BarsIconComponent = ({ className, size = '1em', ...props }: Props) => {
	return (
		<svg
			{...props}
			className={className}
			stroke="currentColor"
			fill="currentColor"
			strokeWidth={0}
			viewBox="0 0 448 512"
			height={size}
			width={size}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
		</svg>
	);
};

export default BarsIconComponent;
