import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect ';

const useLockedScroll = (locked: boolean = true): void => {
	useIsomorphicLayoutEffect(() => {
		if (!locked) {
			return;
		}

		const documentElement = document.documentElement;
		const ownerWindow = document.defaultView ?? window;
		const overflow = documentElement.style.overflow;
		const paddingRight = documentElement.style.paddingRight;
		const scrollbarWidthBefore = ownerWindow.innerWidth - documentElement.clientWidth;

		documentElement.style.overflow = 'hidden';

		if (scrollbarWidthBefore > 0) {
			const scrollbarWidthAfter = documentElement.clientWidth - documentElement.offsetWidth;
			const scrollbarWidth = scrollbarWidthBefore - scrollbarWidthAfter;

			documentElement.style.paddingRight = `${scrollbarWidth}px`;
		}

		return () => {
			documentElement.style.overflow = overflow;
			documentElement.style.paddingRight = paddingRight;
		};
	}, [locked]);
};

export default useLockedScroll;
