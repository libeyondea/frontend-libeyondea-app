import classNames from 'classnames';

type Props = {
	className?: string;
	src?: string;
	alt?: string;
} & React.ComponentPropsWithoutRef<'img'>;

const ImageComponent = ({ className, src, alt, ...props }: Props) => {
	return <img {...props} className={classNames('', className)} src={src} alt={alt} />;
};

export default ImageComponent;
