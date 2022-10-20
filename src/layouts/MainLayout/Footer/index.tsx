import Link from 'src/components/Link';
import config from 'src/config';
import time from 'src/utils/time';

const Footer = () => {
	return (
		<footer className="footer footer-center p-4 shadow-md bg-base-200 text-base-content">
			<p className="flex justify-center font-bold">
				Copyright &copy; {time.yearNow()}
				<Link to="/" className="link link-primary link-hover">
					{config.APP_NAME}
				</Link>
			</p>
		</footer>
	);
};

export default Footer;
