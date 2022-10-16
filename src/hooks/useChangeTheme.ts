import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect ';
import config from 'src/config';

const useChangeTheme = (theme: string = config.DEFAULT_THEME): void => {
	useIsomorphicLayoutEffect(() => {
		const documentElement = document.documentElement;

		documentElement.setAttribute('data-theme', theme);

		return () => {
			documentElement.setAttribute('data-theme', theme);
		};
	}, [theme]);
};

export default useChangeTheme;
