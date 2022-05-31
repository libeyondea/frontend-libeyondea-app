import { useEffect, useRef } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect ';

interface IOverload {
	<K extends keyof WindowEventMap>(eventName: K, handler: (event: WindowEventMap[K]) => void): void;
	<K extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLElement>(
		eventName: K,
		handler: (event: HTMLElementEventMap[K]) => void,
		element: React.RefObject<T>
	): void;
}

const useEventListener: IOverload = <KW extends keyof WindowEventMap, KH extends keyof HTMLElementEventMap, T extends HTMLElement>(
	eventName: KW | KH,
	handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event) => void,
	ref?: React.RefObject<T>
) => {
	const savedHandler = useRef(handler);

	useIsomorphicLayoutEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const targetElement: T | Window = ref?.current || window;
		if (!(targetElement && targetElement.addEventListener)) {
			return;
		}

		const eventListener: typeof handler = (event) => savedHandler.current(event);

		targetElement.addEventListener(eventName, eventListener);

		return () => {
			targetElement.removeEventListener(eventName, eventListener);
		};
	}, [eventName, ref]);
};

export default useEventListener;
