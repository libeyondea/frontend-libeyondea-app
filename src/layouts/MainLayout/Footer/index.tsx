import classNames from 'classnames';

import Link from 'src/components/Link';
import config from 'src/config';
import { useSelector } from 'src/store';
import { selectAppSidebar } from 'src/store/app/selectors';
import time from 'src/utils/time';

const Footer = () => {
	const appSidebar = useSelector(selectAppSidebar);

	return (
		<footer className={classNames('bg-gray-300 p-4 shadow-md transition-all duration-500 ease-in-out', appSidebar ? 'lg:ml-64' : 'ml-0')}>
			<div className="mx-auto px-4 xl:container">
				<p className="flex justify-center text-sm font-bold">
					Copyright &copy; {time.yearNow()}
					<Link to="/" className="ml-1 text-indigo-800">
						{config.APP_NAME}
					</Link>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
