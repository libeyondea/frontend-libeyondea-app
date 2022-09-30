import classNames from 'classnames';

import Image from 'src/components/Image/components';
import Link from 'src/components/Link/components';
import config from 'src/config';
import useAppSelector from 'src/hooks/useAppSelector';
import Logo from 'src/images/logo.png';
import { selectAppSidebar } from 'src/store/app/selectors';
import { selectAuthCurrent } from 'src/store/auth/selectors';

const Footer = () => {
	const authCurrent = useAppSelector(selectAuthCurrent);
	const appSidebar = useAppSelector(selectAppSidebar);

	return (
		<footer
			className={classNames(
				'py-4 bg-gray-200 transition-all ease-in-out duration-500 inset-x-0 bottom-0',
				appSidebar ? 'lg:ml-64' : 'ml-0',
				authCurrent.data.user?.setting.fixed_footer ? 'fixed' : 'static'
			)}
		>
			<div className="xl:container mx-auto px-4">
				<div className="flex justify-center items-center">
					<Image className="rounded-full h-8 w-8 mr-2" src={Logo} alt={config.APP_NAME} />
					<small className="text-gray-500 font-bold">
						Copyright &copy; {new Date().getFullYear()}
						<Link to="/" className="text-indigo-800 ml-1">
							{config.APP_NAME}
						</Link>
					</small>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
