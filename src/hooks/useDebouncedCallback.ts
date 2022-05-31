import { useCallback, useRef } from 'react';

const useDebouncedCallback = <A extends any[]>(callback: (...args: A) => void, wait: number = 666): ((...args: A) => void) => {
	const argsRef = useRef<A>();
	const timeout = useRef<ReturnType<typeof setTimeout>>();

	return useCallback(
		(...args: A) => {
			argsRef.current = args;

			if (timeout.current) {
				clearTimeout(timeout.current);
			}

			const later = () => {
				if (argsRef.current) {
					callback(...args);
				}
			};

			timeout.current = setTimeout(later, wait);
		},
		[callback, wait]
	);
};

export default useDebouncedCallback;
