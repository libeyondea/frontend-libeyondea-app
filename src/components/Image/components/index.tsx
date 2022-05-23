import classNames from 'classnames';

type Props = {
	className?: string;
	src?: string;
	alt?: string;
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const ImageComponent: React.FC<Props> = ({ src, alt, className, ...props }) => {
	return <img {...props} className={classNames('', className)} src={src} alt={alt} />;
};

export default ImageComponent;
