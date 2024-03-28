import Link from 'src/components/Link';
import config from 'src/config';
import time from 'src/utils/time';

const Footer = () => {
	return (
		<footer className="footer footer-center bg-base-200 p-4 text-base-content shadow-md">
			<p className="flex justify-center font-bold">
				Copyright &copy; {time.yearNow()}
				<Link to="/" className="link-hover link-primary link">
					{config.APP_NAME}
				</Link>
			</p>
		</footer>
	);
};

export default Footer;
