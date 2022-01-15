interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {}

const ImageComponent: React.FC<Props> = ({ src, alt, className, ...props }) => (
	<img src={src} alt={alt} className={className} {...props} />
);

export default ImageComponent;
