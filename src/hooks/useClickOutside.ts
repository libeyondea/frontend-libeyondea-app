import { EffectCallback, useEffect } from 'react';

const useClickOutside = (effect: EffectCallback, ref: React.MutableRefObject<Element | null>): void => {
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
	}, [effect, ref]);
};

export default useClickOutside;
