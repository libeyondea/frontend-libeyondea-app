import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect ';

const useLockedScroll = (locked: boolean = true): void => {
	useIsomorphicLayoutEffect(() => {
		if (!locked) {
			return;
		}

		let documentElement = document.documentElement;
		let ownerWindow = document.defaultView ?? window;

		let overflow = documentElement.style.overflow;
		let paddingRight = documentElement.style.paddingRight;

		let scrollbarWidthBefore = ownerWindow.innerWidth - documentElement.clientWidth;

		documentElement.style.overflow = 'hidden';

		if (scrollbarWidthBefore > 0) {
			let scrollbarWidthAfter = documentElement.clientWidth - documentElement.offsetWidth;
			let scrollbarWidth = scrollbarWidthBefore - scrollbarWidthAfter;
			documentElement.style.paddingRight = `${scrollbarWidth}px`;
		}

		return () => {
			documentElement.style.overflow = overflow;
			documentElement.style.paddingRight = paddingRight;
		};
	}, [locked]);
};

export default useLockedScroll;
