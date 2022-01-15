import ImageComponent from 'common/components/Image/components';
import config from 'config';

type Props = {};

const FooterComponent: React.FC<Props> = () => {
	return (
		<footer className="footer py-4 bg-gray-200 transition-all ease-in-out duration-500">
			<div className="xl:container mx-auto px-4">
				<div className="flex justify-center items-center">
					<ImageComponent className="rounded-full h-9 w-9 mr-2" src={config.LOGO_URL} alt={config.APP_NAME} />
					<small>
						Copyright &copy; {new Date().getFullYear()}
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://libeyondea.com"
							className="text-indigo-800 font-bold ml-1"
						>
							{config.APP_NAME}
						</a>
					</small>
				</div>
			</div>
		</footer>
	);
};

export default FooterComponent;
