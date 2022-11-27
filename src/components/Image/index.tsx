type Props = {
	className?: string;
	src?: string;
	alt?: string;
} & React.ComponentPropsWithoutRef<'img'>;

const Image = ({ className, src, alt, ...props }: Props) => {
	return <img {...props} className={className} src={src} alt={alt} />;
};

export default Image;
