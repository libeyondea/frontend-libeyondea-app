import { DependencyList, EffectCallback, useEffect } from 'react';

const useOutsideClick = (effect: EffectCallback, ref: React.MutableRefObject<Element | null>, deps: DependencyList): void => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				effect();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};

export default useOutsideClick;
