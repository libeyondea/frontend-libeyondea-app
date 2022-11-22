import { useIsomorphicLayoutEffect } from 'react-use';

import config from 'src/config';

const useTheme = (theme: string = config.DEFAULT_THEME): void => {
	useIsomorphicLayoutEffect(() => {
		const documentElement = document.documentElement;

		documentElement.setAttribute('data-theme', theme);

		return () => {
			documentElement.setAttribute('data-theme', theme);
		};
	}, [theme]);
};

export default useTheme;
