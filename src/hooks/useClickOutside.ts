import { useEffect, useRef } from 'react';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect ';

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(ref: React.RefObject<T>, handler: (event: MouseEvent | TouchEvent) => void): void => {
	const handlerRef = useRef(handler);

	useIsomorphicLayoutEffect(() => {
		handlerRef.current = handler;
	}, [handler]);

	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}
			handlerRef.current(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref]);
};

export default useOnClickOutside;
