import { useEffect, useState } from 'react';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect ';

type WindowSize = {
	width: number;
	height: number;
};

const useWindowSize = (): WindowSize => {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: 0,
		height: 0
	});

	const handleResize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight
		});
	};

	useIsomorphicLayoutEffect(() => {
		handleResize();
	}, []);

	useEffect(() => {
		document.addEventListener('resize', handleResize);

		return () => {
			document.removeEventListener('resize', handleResize);
		};
	}, []);

	return windowSize;
};

export default useWindowSize;
