import { getOwnerDocument } from 'helpers/utils';
import { DependencyList, MutableRefObject, useEffect } from 'react';

const useScrollLock = (isLock = false, ref: MutableRefObject<Element | null>, deps: DependencyList): void => {
	useEffect(() => {
		if (!isLock) return;

		let ownerDocument = getOwnerDocument(ref);
		if (!ownerDocument) return;

		let documentElement = ownerDocument.documentElement;
		let ownerWindow = ownerDocument.defaultView ?? window;

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};

export default useScrollLock;
