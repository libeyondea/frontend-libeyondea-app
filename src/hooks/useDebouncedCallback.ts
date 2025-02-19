import { useCallback, useRef } from 'react';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect ';

const useDebouncedCallback = <A extends any[]>(callback: (...args: A) => void, wait: number = 666): ((...args: A) => void) => {
	const argsRef = useRef<A>(undefined);
	const callbackRef = useRef(callback);
	const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

	useIsomorphicLayoutEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	return useCallback(
		(...args: A) => {
			argsRef.current = args;

			const later = () => {
				if (argsRef.current) {
					callbackRef.current(...args);
				}
			};

			if (timeout.current) {
				clearTimeout(timeout.current);
			}

			timeout.current = setTimeout(later, wait);
		},
		[wait]
	);
};

export default useDebouncedCallback;
