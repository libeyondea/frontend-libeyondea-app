import { Link, LinkProps } from 'react-router-dom';

interface Props extends LinkProps {}

const LinkComponent: React.FC<Props> = ({ className, to, children, ...props }) => (
	<Link to={to} className={className} {...props}>
		{children}
	</Link>
);

export default LinkComponent;
