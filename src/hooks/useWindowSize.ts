import { useState } from 'react';
import useEventListener from './useEventListener';
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

	useEventListener('resize', handleResize);

	useIsomorphicLayoutEffect(() => {
		handleResize();
	}, []);

	return windowSize;
};

export default useWindowSize;
