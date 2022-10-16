import Link from 'src/components/Link';
import config from 'src/config';

const Footer = () => {
	return (
		<footer className="footer footer-center p-4 shadow-md bg-base-200 text-base-content">
			<p className="flex justify-center font-bold">
				Copyright &copy; {new Date().getFullYear()}
				<Link to="/" className="link link-primary link-hover ml-1">
					{config.APP_NAME}
				</Link>
			</p>
		</footer>
	);
};

export default Footer;
